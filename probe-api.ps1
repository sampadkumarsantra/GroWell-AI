function Test-Url($path) {
    try {
        $r = Invoke-RestMethod -Uri ("https://growell-ai-2.onrender.com" + $path) -Method Get -TimeoutSec 90
        Write-Output ("OK   " + $path + " -> success=" + $r.success)
    } catch {
        Write-Output ("FAIL " + $path + " -> " + $_.Exception.Message)
    }
}

Write-Output "--- deployed ---"
Test-Url "https://growell-ai-2.onrender.com" "/api/status"
Test-Url "https://growell-ai-2.onrender.com" "/api/market/summary"
Test-Url "https://growell-ai-2.onrender.com" "/api/market/commodities"
Test-Url "https://growell-ai-2.onrender.com" "/api/market/history?commodity=Wheat"
Test-Url "https://growell-ai-2.onrender.com" "/api/market/records?commodity=Wheat&page=1&limit=5"
Test-Url "https://growell-ai-2.onrender.com" "/api/market/national?commodity=Wheat"
Test-Url "https://growell-ai-2.onrender.com" "/api/chat"
Test-Url "https://growell-ai-2.onrender.com" "/api/soil"
Test-Url "https://growell-ai-2.onrender.com" "/api/decision"
Test-Url "https://growell-ai-2.onrender.com" "/api/weather/summary"

Write-Output "--- local ---"
Test-Url "http://localhost:3000" "/api/status"
Test-Url "http://localhost:3000" "/api/market/summary"
Test-Url "http://localhost:3000" "/api/market/commodities"
Test-Url "http://localhost:3000" "/api/market/history?commodity=Wheat"
Test-Url "http://localhost:3000" "/api/market/records?commodity=Wheat&page=1&limit=5"
Test-Url "http://localhost:3000" "/api/market/national?commodity=Wheat"
Test-Url "http://localhost:3000" "/api/chat"
Test-Url "http://localhost:3000" "/api/soil"
Test-Url "http://localhost:3000" "/api/decision"
Test-Url "http://localhost:3000" "/api/weather/summary"
