# Builds Escape Builder from its source:
#   src/core.js   the code generator (boards, parts, rules, scenes -> Arduino/ESP32 code and show files)
#   src/ui.js     the page's interface
#   src/escape-builder.html   the page itself; the two scripts above are put into it here
# and writes the website version, index.html (escapebuilder.online), next to this folder.
#
#   python3 tools/build.py
#
# src/escape-builder.html is also the file published as the Claude artifact (Claude adds the
# <html>/<head> when publishing, so the page starts at its <title>).
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = lambda name: os.path.join(ROOT, "src", name)
read = lambda p: open(p, encoding="utf-8").read()

page = read(src("escape-builder.html"))
core, ui = read(src("core.js")), read(src("ui.js"))

# The generator goes in <script id="core">, the interface in the last <script>, after the icons marker
a = page.index('<script id="core">') + len('<script id="core">')
b = page.index("</script>", a)
page = page[:a] + "\n" + core + page[b:]
a = page.index("<script>\n// ───────────────────────── Icons")
a = page.index("\n", a) + 1
b = page.rindex("</script>")
page = page[:a] + ui + page[b:]
open(src("escape-builder.html"), "w", encoding="utf-8").write(page)

# Website: the same page with its own <html>/<head>, the title and description in the head
title = "<title>Escape Builder</title>"
assert page.startswith(title)
body = page[len(title):].lstrip("\n")
head = "\n".join([
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    title,
    '<meta name="description" content="Design escape room props and shows, and get Arduino and ESP32 code for them.">',
    "<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
    'body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>',
    "</head>",
    "<body>",
    "",
])
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(head + body + "\n</body>\n</html>\n")
print("built src/escape-builder.html and index.html")
