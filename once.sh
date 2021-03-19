# 第一次关联两个仓库
git init
git add .
echo -e "\n# commit"
git commit -m "first commit"

echo -e "\n# remote origin(GitHub|Gitee)"
git remote add github git@github.com:uphg/node-toup.git
git remote add gitee git@gitee.com:uphg/node-toup.git

echo -e "\n# push Github"
git push github master:master

echo -e "\n# push Gitee"
git push gitee master:master
