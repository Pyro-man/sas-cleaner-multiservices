# Script pour formater et rendre plus lisibles les fichiers HTML
# Auteur: Assistant IA
# Date: $(Get-Date)

Write-Host "=== FORMATAGE DES FICHIERS HTML POUR AMÉLIORER LA LISIBILITÉ ===" -ForegroundColor Green

# Fonction pour formater un fichier HTML
function Format-HtmlFile {
    param(
        [string]$FilePath
    )
    
    try {
        Write-Host "Formatage de: $FilePath" -ForegroundColor Yellow
        
        # Lire le contenu du fichier
        $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
        
        if ($null -eq $content) {
            Write-Host "  Fichier vide, ignoré" -ForegroundColor Gray
            return
        }
        
        # Nettoyer les commentaires HTTrack
        $content = $content -replace '<!-- Mirrored from.*?-->', ''
        $content = $content -replace '<!-- Added by HTTrack.*?-->', ''
        $content = $content -replace '<!-- /Added by HTTrack -->', ''
        
        # Supprimer les espaces multiples et les retours à la ligne inutiles
        $content = $content -replace '\s+', ' '
        $content = $content -replace '>\s+<', '><'
        
        # Ajouter des retours à la ligne après les balises principales
        $content = $content -replace '(<!doctype[^>]*>)', "`n`n$1"
        $content = $content -replace '(<html[^>]*>)', "`n$1"
        $content = $content -replace '(<head>)', "`n`n$1"
        $content = $content -replace '(<title>[^<]*</title>)', "`n  $1"
        $content = $content -replace '(<meta[^>]*>)', "`n  $1"
        $content = $content -replace '(<link[^>]*>)', "`n  $1"
        $content = $content -replace '(<script[^>]*>)', "`n  $1"
        $content = $content -replace '(<style[^>]*>)', "`n  $1"
        $content = $content -replace '(<body[^>]*>)', "`n`n$1"
        $content = $content -replace '(<header[^>]*>)', "`n`n$1"
        $content = $content -replace '(<nav[^>]*>)', "`n$1"
        $content = $content -replace '(<main[^>]*>)', "`n`n$1"
        $content = $content -replace '(<section[^>]*>)', "`n`n$1"
        $content = $content -replace '(<article[^>]*>)', "`n$1"
        $content = $content -replace '(<aside[^>]*>)', "`n$1"
        $content = $content -replace '(<footer[^>]*>)', "`n`n$1"
        $content = $content -replace '(<div[^>]*>)', "`n$1"
        $content = $content -replace '(<h[1-6][^>]*>)', "`n$1"
        $content = $content -replace '(<p[^>]*>)', "`n$1"
        $content = $content -replace '(<ul[^>]*>)', "`n$1"
        $content = $content -replace '(<ol[^>]*>)', "`n$1"
        $content = $content -replace '(<li[^>]*>)', "`n  $1"
        $content = $content -replace '(<a[^>]*>)', "`n  $1"
        $content = $content -replace '(<img[^>]*>)', "`n  $1"
        $content = $content -replace '(<form[^>]*>)', "`n$1"
        $content = $content -replace '(<input[^>]*>)', "`n  $1"
        $content = $content -replace '(<button[^>]*>)', "`n  $1"
        $content = $content -replace '(<textarea[^>]*>)', "`n  $1"
        $content = $content -replace '(<select[^>]*>)', "`n  $1"
        $content = $content -replace '(<option[^>]*>)', "`n    $1"
        
        # Ajouter des retours à la ligne avant les balises fermantes
        $content = $content -replace '(</head>)', "`n$1"
        $content = $content -replace '(</body>)', "`n`n$1"
        $content = $content -replace '(</html>)', "`n$1"
        $content = $content -replace '(</header>)', "`n$1"
        $content = $content -replace '(</nav>)', "`n$1"
        $content = $content -replace '(</main>)', "`n$1"
        $content = $content -replace '(</section>)', "`n$1"
        $content = $content -replace '(</article>)', "`n$1"
        $content = $content -replace '(</aside>)', "`n$1"
        $content = $content -replace '(</footer>)', "`n$1"
        $content = $content -replace '(</div>)', "`n$1"
        $content = $content -replace '(</h[1-6]>)', "`n$1"
        $content = $content -replace '(</p>)', "`n$1"
        $content = $content -replace '(</ul>)', "`n$1"
        $content = $content -replace '(</ol>)', "`n$1"
        $content = $content -replace '(</li>)', "`n  $1"
        $content = $content -replace '(</a>)', "`n  $1"
        $content = $content -replace '(</form>)', "`n$1"
        $content = $content -replace '(</button>)', "`n  $1"
        $content = $content -replace '(</textarea>)', "`n  $1"
        $content = $content -replace '(</select>)', "`n  $1"
        $content = $content -replace '(</option>)', "`n    $1"
        
        # Nettoyer les retours à la ligne multiples
        $content = $content -replace "`n{3,}", "`n`n"
        
        # Ajouter une indentation de base
        $lines = $content -split "`n"
        $indentedLines = @()
        $indentLevel = 0
        
        foreach ($line in $lines) {
            $trimmedLine = $line.Trim()
            
            if ($trimmedLine -eq "") {
                $indentedLines += ""
                continue
            }
            
            # Réduire l'indentation pour les balises fermantes
            if ($trimmedLine -match '^</[^/]') {
                $indentLevel = [Math]::Max(0, $indentLevel - 1)
            }
            
            # Ajouter l'indentation
            $indent = "  " * $indentLevel
            $indentedLines += $indent + $trimmedLine
            
            # Augmenter l'indentation pour les balises ouvrantes (sauf les balises auto-fermantes)
            if ($trimmedLine -match '^<[^/][^>]*[^/]>$' -and $trimmedLine -notmatch '^<(img|br|hr|input|meta|link|script|style)[^>]*>$') {
                $indentLevel++
            }
        }
        
        # Rejoindre les lignes
        $formattedContent = $indentedLines -join "`n"
        
        # Sauvegarder le fichier formaté
        $formattedContent | Out-File -FilePath $FilePath -Encoding UTF8 -NoNewline
        
        Write-Host "  ✓ Formaté avec succès" -ForegroundColor Green
        
    } catch {
        Write-Host "  ✗ Erreur lors du formatage: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Trouver tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse

Write-Host "`nFichiers HTML trouvés: $($htmlFiles.Count)" -ForegroundColor Cyan

# Formater chaque fichier
foreach ($file in $htmlFiles) {
    Format-HtmlFile -FilePath $file.FullName
}

Write-Host "`n=== FORMATAGE TERMINÉ ===" -ForegroundColor Green
Write-Host "Tous les fichiers HTML ont été formatés pour améliorer la lisibilité." -ForegroundColor White
