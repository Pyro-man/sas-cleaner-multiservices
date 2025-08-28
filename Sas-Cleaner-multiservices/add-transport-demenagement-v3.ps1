# Script pour ajouter les liens Transport et Déménagement aux menus des autres pages - VERSION PRÉCISE
# Ces liens existent dans la page d'accueil mais pas dans les autres pages

# Liens à ajouter (structure WordPress complexe)
$transportLink = '<li id="menu-item-2002" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2002"><div class="grve-link-wrapper"><a href="service/transport-marchandises/index.html"><span class="grve-item">Transport de Marchandises</span></a></div></li>'
$demenagementLink = '<li id="menu-item-2004" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2004"><div class="grve-link-wrapper"><a href="service/demenagement/index.html"><span class="grve-item">Services de Déménagement</span></a></div></li>'

# Liens à ajouter pour les pages dans des sous-dossiers (ajustement des chemins)
$transportLinkSubdir = '<li id="menu-item-2002" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2002"><div class="grve-link-wrapper"><a href="../service/transport-marchandises/index.html"><span class="grve-item">Transport de Marchandises</span></a></div></li>'
$demenagementLinkSubdir = '<li id="menu-item-2004" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2004"><div class="grve-link-wrapper"><a href="../service/demenagement/index.html"><span class="grve-item">Services de Déménagement</span></a></div></li>'

# Fonction pour traiter un fichier
function Process-File {
    param($filePath)
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # Vérifier si les liens existent déjà
    if ($content -match "Transport de Marchandises" -or $content -match "Services de Déménagement") {
        Write-Host "Liens déjà présents dans $filePath - Ignoré"
        return $false
    }
    
    # Déterminer si c'est la page d'accueil ou une sous-page
    $isSubdir = $filePath -match "\\[^\\]+\\index\.html$"
    
    if ($isSubdir) {
        $linksToAdd = $transportLinkSubdir + $demenagementLinkSubdir
    } else {
        $linksToAdd = $transportLink + $demenagementLink
    }
    
    # Chercher la fin du menu principal pour insérer les nouveaux liens
    # Pattern pour trouver la fin du menu (avant la fermeture de </ul> du menu principal)
    $pattern = '(</ul></div></li></ul></div></li></ul></div></li>)'
    
    if ($content -match $pattern) {
        $newContent = $content -replace $pattern, $linksToAdd + '$1'
        
        # Sauvegarder le fichier
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "Liens ajoutés à $filePath"
        return $true
    } else {
        # Essayer un pattern alternatif
        $pattern2 = '(</ul></div></li></ul></div></li>)'
        if ($content -match $pattern2) {
            $newContent = $content -replace $pattern2, $linksToAdd + '$1'
            Set-Content $filePath $newContent -Encoding UTF8
            Write-Host "Liens ajoutés à $filePath (pattern alternatif)"
            return $true
        } else {
            Write-Host "Pattern de menu non trouvé dans $filePath"
            return $false
        }
    }
}

# Traiter tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "index.html" -Recurse

$updatedCount = 0
$totalCount = 0

foreach ($file in $htmlFiles) {
    $totalCount++
    if (Process-File $file.FullName) {
        $updatedCount++
    }
}

Write-Host "`nRésumé :"
Write-Host "Fichiers traités : $totalCount"
Write-Host "Fichiers mis à jour : $updatedCount"
Write-Host "Fichiers ignorés (liens déjà présents) : $($totalCount - $updatedCount)"
