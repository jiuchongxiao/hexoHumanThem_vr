# hexoHumanThem
自动静态网站：http://www.staticgen.com/
hexo themes:https://github.com/hexojs/hexo/wiki/Themes

部署步骤：
  1.删除项目根目录中的.deploy_git文件夹
  2.hexo clean
  3.hexo g
  4.hexo d                      
    部署前需要配置_config.yml
    deploy:
      type: git
      repository: git@github.com:jiuchongxiao/jiuchongxiao.github.io.git
      branch: master
      name: jiuchongxiaos
  5.访问:https://github.com/jiuchongxiao/jiuchongxiao.github.io
注意：本地访问
  1.hexo s
  2.访问：http://localhost:4000/
  
  3.hexo g生成的静态文件在本地没法访问


  4.部署
        1)本地启动hexo s 则_config.yml中的root 可以为/或者/blog/public        对应的post中的图片路径为/css/images/ 或者/blog/public/css/images/
        2)hexo g生成的静态文件   部署到tomcat
            2.1)部署到webapp下   则_config.yml中的root为/blog/public    且  post中的图片路径为/blog/public/css/images/
            2.2)部署到root下      则_config.yml中的root为/blog/public 且 post中的图片路径为/css/images/

            方法：替换post中图片的路径 ctrl+shift+r  全文替换

         部署到root方式：
                 将附件替换tomcat下webapps文件夹中的ROOT。部署成功后访问方式为http://192.168.3.102:8080/    其中ip为tomcat所在服务器 8080为tomcat端口
  
