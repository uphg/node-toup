if [ -z "$1" ];then
params="update"
else
params="$1"
fi

git add .
echo -e "\n# commit code"
git commit -m "${params}"

echo -e "\n# push Github"
git push github master
git push github next

echo -e "\n# push Gitee"
git push gitee master
git push gitee next
