$branch = "feat/kaizen-actualizacion-e2e-auth"
function Test-KebabCase {
    param([string]$s)
    if ([string]::IsNullOrWhiteSpace($s)) { return $false }
    return $s -match '^[a-z0-9]+(-[a-z0-9]+)*$'
}
function Test-BranchName {
    param([string]$b)
    if ($b -eq "main" -or $b -eq "master") { return $true }
    if ($b -match '^feat/(.+)$') { $suffix = $Matches[1]; return (Test-KebabCase $suffix) -or ($suffix -match '^refactorization-[a-z0-9]+(-[a-z0-9]+)*$') }
    if ($b -match '^fix/(.+)$') { return Test-KebabCase $Matches[1] }
    return $false
}
Test-BranchName $branch
