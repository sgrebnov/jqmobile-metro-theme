param($installPath, $toolsPath, $package, $project)

$sampleImages = $project.ProjectItems.item("www").ProjectItems.item("images").ProjectItems;
$metroThemeImages =  $project.ProjectItems.item("www").ProjectItems.item("css").ProjectItems.item("metro").ProjectItems.item("images").ProjectItems; 
	
$items = $sampleImages + $metroThemeImages;
	
foreach ($item in $sampleImages)
{   
    $prop = $item.Properties.Item("BuildAction");
    if ($prop -ne $null) {
		$prop.Value = [int]2;
	}
}

foreach ($item in $metroThemeImages)
{   
    $prop = $item.Properties.Item("BuildAction");
    if ($prop -ne $null) {
		$prop.Value = [int]2;
	}
}