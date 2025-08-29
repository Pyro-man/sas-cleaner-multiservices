# Script pour supprimer les images des métadonnées dans toutes les pages de services restantes

# Traiter tous les fichiers HTML dans le dossier service
$serviceFiles = Get-ChildItem -Path "service" -Filter "index.html" -Recurse

foreach ($file in $serviceFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Supprimer les balises meta og:image et leurs propriétés
    $content = $content -replace '<meta property="og:image"[^>]*>', ''
    $content = $content -replace '<meta property="og:image:width"[^>]*>', ''
    $content = $content -replace '<meta property="og:image:height"[^>]*>', ''
    $content = $content -replace '<meta property="og:image:type"[^>]*>', ''
    
    # Sauvegarder le fichier
    Set-Content $file.FullName $content -Encoding UTF8
    Write-Host "Images supprimées de $($file.FullName)"
}

Write-Host "`nTraitement terminé !"
