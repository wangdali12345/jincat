@echo off
echo 🍎 杭州自家小猫咪-李先生 - 构建脚本
echo.

echo [1/3] 清理旧的构建文件...
if exist build rmdir /s /q build

echo [2/3] 开始构建项目...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo [3/3] 复制404页面到构建目录...
copy public\404.html build\

echo.
echo ✅ 构建完成！
echo 构建文件位于 build/ 文件夹中
echo 现在可以将 build/ 文件夹内容上传到GitHub Pages了
echo.
pause