$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    throw "Python 3.10 or newer is required. Install Python and enable 'Add Python to PATH', then run this script again."
}
& $python.Source --version *> $null
if ($LASTEXITCODE -ne 0) {
    throw "Python was found but could not be started. Install Python 3.10 or newer and enable 'Add Python to PATH'."
}

$env:ADMIN_USERNAME = "peter"
$password = Read-Host "Enter the admin password" -AsSecureString
$passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
try {
    $env:ADMIN_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
    & $python.Source (Join-Path $PSScriptRoot "server.py")
    if ($LASTEXITCODE -ne 0) {
        throw "The Crown Perfume server stopped with exit code $LASTEXITCODE."
    }
}
finally {
    Remove-Item Env:ADMIN_USERNAME -ErrorAction SilentlyContinue
    Remove-Item Env:ADMIN_PASSWORD -ErrorAction SilentlyContinue
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
    $password.Dispose()
}
