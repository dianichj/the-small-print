# Zenodo deposits for The Small Print

Genera los metadatos de Zenodo para cada artículo y, opcionalmente, crea el depósito
(borrador) vía la API de Zenodo, para obtener un DOI individual por artículo.

⚠️ **Los DOIs son permanentes.** Una vez publicado un depósito en Zenodo, no se puede
borrar ni reasignar el DOI — como mucho se puede subir una nueva versión. Por eso el
script nunca publica automáticamente: solo crea/actualiza un **borrador**, y publicar
requiere pasar `--publish` y además confirmar interactivamente escribiendo `PUBLISH`.

## 1. Configuración inicial (una sola vez)

### Instalar dependencias

```bash
cd zenodo
npm install
```

### Obtener el token de Zenodo

1. Entrá a tu cuenta personal de Zenodo (no una cuenta institucional) → **Applications**
   → **Personal access tokens** → **New token**.
2. Marcá los scopes `deposit:write` y `deposit:actions`.
3. Copiá el token (Zenodo solo lo muestra una vez) y exportalo en tu terminal:

```bash
export ZENODO_TOKEN="tu-token-aquí"
```

Recomendado: probar todo primero contra **sandbox.zenodo.org**, que es un entorno de
pruebas separado con su propio token (se obtiene igual, pero desde
https://sandbox.zenodo.org). Usá la flag `--sandbox` en el script para apuntar ahí.

### Crear la Community "The Small Print"

1. En Zenodo (cuenta personal) → **Communities** → **New community**.
2. Identifier: `the-small-print` (tiene que coincidir exactamente con el valor que
   usa `metadata-template.json` en `communities[0].identifier`).
3. Nombre visible: "The Small Print". Descripción breve del proyecto editorial.
4. No hace falta curar/aprobar depósitos manualmente si sos la única que deposita,
   pero podés dejar la opción activada si preferís revisar antes de que un depósito
   quede asociado a la community.

### Completar tu ORCID en el template

Editá `zenodo/metadata-template.json` y reemplazá `<ORCID>` por tu ORCID iD real
(formato `0000-0000-0000-0000`). Si no tenés uno, se crea gratis en
https://orcid.org/register. Es un valor fijo — se completa una sola vez acá, no por
artículo.

## 2. Generar los metadatos de un artículo

```bash
node generate-metadata.js ../src/content/articles/issue-01-article-01.md
```

Esto lee el frontmatter del artículo y escribe
`zenodo/output/issue-01-article-01.en.json` con los metadatos listos para Zenodo.

Mapeo de campos:

| Frontmatter del artículo | Campo de Zenodo |
|---|---|
| `title` | `title` |
| `deck` + aviso de independencia editorial | `description` |
| `tags` (o `topic` si no hay `tags`) | `keywords` |
| `paperDOI` | `related_identifiers` — relación `references` |
| URL del artículo en el sitio (calculada) | `related_identifiers` — relación `isVariantFormOf` |
| carpeta del artículo (`articles/` o `articles-es/`) o `language` explícito en el frontmatter | `language` |

El resto de los campos (`upload_type`, `creators`, `license`, `communities`, etc.)
salen fijos de `metadata-template.json`.

### La versión en el otro idioma (`isTranslationOf`)

Cuando ya publicaste la versión en inglés (o en español) de un artículo y tenés su
DOI, pasáselo al generar la otra versión para declarar la relación `isTranslationOf`:

```bash
node generate-metadata.js ../src/content/articles-es/issue-01-article-01.md \
  --translation-doi 10.5281/zenodo.1234567
```

### Otras opciones útiles

```bash
# Fecha de publicación exacta (el frontmatter solo tiene "June 2026", no el día)
node generate-metadata.js ../src/content/articles/issue-01-article-01.md --date 2026-06-15

# Dónde escribir el JSON generado
node generate-metadata.js ../src/content/articles/issue-01-article-01.md --out /tmp/meta.json
```

El script va a avisar por consola (⚠) si no pudo adivinar la fecha de publicación o
si el ORCID sigue siendo el placeholder — no falla, pero hay que revisarlo antes de
depositar.

## 3. Crear el depósito (borrador) en Zenodo

```bash
node generate-metadata.js ../src/content/articles/issue-01-article-01.md \
  --deposit \
  --pdf ../ruta/al/articulo.pdf \
  --sandbox
```

Esto crea un depósito nuevo en modo **borrador**, le carga los metadatos generados,
sube el PDF, y te devuelve el link al borrador en Zenodo para que lo revises a mano.
Sacá `--sandbox` cuando quieras hacerlo contra Zenodo real.

**El depósito NUNCA se publica en este paso.** Sigue siendo un borrador editable
hasta que corras el comando de nuevo con `--publish`.

## 4. Publicar (irreversible)

```bash
node generate-metadata.js ../src/content/articles/issue-01-article-01.md \
  --deposit --publish \
  --pdf ../ruta/al/articulo.pdf
```

El script va a:
1. Crear/actualizar el borrador igual que en el paso 3.
2. Mostrar una advertencia de que publicar es permanente, con el link al borrador.
3. Pedir que escribas literalmente `PUBLISH` para confirmar. Cualquier otra cosa
   cancela — el borrador queda intacto y lo podés publicar después a mano desde el
   dashboard de Zenodo.

## 5. Qué revisar antes de publicar (checklist)

Antes de escribir `PUBLISH`, revisá el borrador en Zenodo (el link que imprime el
script) y confirmá:

- [ ] **Título** coincide exactamente con el del artículo.
- [ ] **ORCID** es el tuyo, no el placeholder.
- [ ] **Descripción** se lee bien y termina con la línea de independencia editorial.
- [ ] **Licencia**: CC BY 4.0.
- [ ] **Keywords** son razonables (si el artículo no tenía `tags`, va a haber caído
      en un único keyword genérico sacado de `topic` — considerá agregarle `tags`
      al frontmatter antes de depositar).
- [ ] **`related_identifiers`**: el DOI del paper original resuelve bien en
      doi.org, y la URL del artículo en el sitio está en producción (no en
      localhost) y funciona.
- [ ] Si aplica, el DOI de `isTranslationOf` es correcto y resuelve.
- [ ] **`publication_date`** es la fecha real, no una fecha adivinada por el script
      (revisá el aviso ⚠ en la consola).
- [ ] **PDF adjunto** es la versión final del artículo, no un borrador.
- [ ] **Community**: aparece "The Small Print".
- [ ] **Idioma**: `eng` para artículos en inglés, `spa` para español.

## Variables de entorno

| Variable | Para qué | Default |
|---|---|---|
| `ZENODO_TOKEN` | Autenticación con la API de Zenodo | — (requerida para `--deposit`) |
| `SITE_URL` | Base para construir la URL del artículo (`isVariantFormOf`) | `https://thesmallprint.pub` |
