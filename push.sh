if [ -z "$1" ];then
params="update"
else
params="$1"
fi

git add .
echo -e "\n# commit code"
git commit -m "${params}"

echo -e "\n# push Github"
git push github master:master

echo -e "\n# push Gitee"
git push gitee master:master
