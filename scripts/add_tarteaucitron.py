#!/usr/bin/env python3
"""
Script to integrate tarteaucitron.js GDPR consent into all HTML pages.
- Removes Google Analytics block
- Adds tarteaucitron scripts before </head>
- Special handling for index.html (removes preconnect links, keeps EmailJS CDN)
"""
import re
import sys

TARTEAUCITRON_SNIPPET = """\
    <link rel="stylesheet" href="/vendor/tarteaucitron/tarteaucitron.css">
    <link rel="stylesheet" href="/css/tarteaucitron-custom.css">
    <script src="/vendor/tarteaucitron/tarteaucitron.js"></script>
    <script src="/vendor/tarteaucitron/lang/tarteaucitron.fr.js"></script>
    <script src="/scripts/consent.js"></script>
</head>"""

# Matches the full GA block: comment + async script + inline script
GA_PATTERN = re.compile(
    r'\s*<!-- Google tag \(gtag\.js\) -->\s*\n'
    r'.*?<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-DEK5H3Z9DR">'
    r'</script>\s*\n'
    r'.*?<script>.*?</script>',
    re.DOTALL
)

# Matches the two preconnect lines specific to index.html
PRECONNECT_GTM = re.compile(
    r'[ \t]*<link rel="preconnect" href="https://www\.googletagmanager\.com">\n'
)
PRECONNECT_JSDELIVR = re.compile(
    r'[ \t]*<link rel="preconnect" href="https://cdn\.jsdelivr\.net" crossorigin>\n'
)


def process_file(path: str, is_index: bool = False) -> tuple[bool, str]:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remove GA block
    content = GA_PATTERN.sub('', content)

    if is_index:
        content = PRECONNECT_GTM.sub('', content)
        content = PRECONNECT_JSDELIVR.sub('', content)

    # Insert tarteaucitron before </head>
    if '</head>' in content:
        content = content.replace('</head>', TARTEAUCITRON_SNIPPET, 1)

    changed = content != original
    return changed, content


def main():
    files = [
        ('index.html', True),
        ('faq.html', False),
        ('mentions-legales.html', False),
        ('merci.html', False),
        ('blog/index.html', False),
        ('blog/aac-apprentissage-anticipe-conduite.html', False),
        ('blog/auto-ecole-en-ligne-ou-marti.html', False),
        ('blog/boite-automatique-ou-manuelle.html', False),
        ('blog/combien-coute-permis-conduire-bayonne.html', False),
        ('blog/comment-reussir-son-permis-conduire.html', False),
        ('blog/conduite-supervisee.html', False),
        ('blog/dangers-alcool.html', False),
        ('blog/distances-securite.html', False),
        ('blog/infractions-code-route.html', False),
        ('blog/questions-pieges-code-route.html', False),
        ('blog/reflexes-quiz.html', False),
        ('blog/reflexes-urgence-conduite.html', False),
        ('blog/regles-permis-probatoire.html', False),
        ('blog/reussir-code-route-premier-coup.html', False),
        ('blog/simulateur-ecoconduite.html', False),
        ('blog/quiz-sanctions.html', False),
        ('formules/index.html', False),
        ('formules/conduite-accompagnee.html', False),
        ('formules/permis-b-automatique.html', False),
        ('formules/permis-b-manuel.html', False),
    ]

    ok = 0
    for path, is_index in files:
        changed, new_content = process_file(path, is_index)
        if changed:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'  OK  {path}')
            ok += 1
        else:
            print(f' SKIP {path} (no changes detected)')

    print(f'\n{ok}/{len(files)} files updated.')


if __name__ == '__main__':
    main()
