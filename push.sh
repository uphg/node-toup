if [ -z $1 ];then
parame="update"
else
parame=$1
fi


git add .
echo -e "\n# commit code"
git commit -m "${parame}"

echo -e "\n# push Github"
git push github master:master

echo -e "\n# push Gitee"
git push gitee master:master
