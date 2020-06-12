# gocmdb-front

## Description

You should deploy the backend first. Deploy backend go to `->` [gocmdb-backend](https://github.com/gogo-fast/gocmdb-backend)

After finished backend deployment, you could continue the following steps.



## Quick start with docker

- Docker version

  ```shell
  $ docker -v
  Docker version 19.03.1, build 74b1e89
  ```

- Clone code

  ```shell
  git clone https://github.com/gogo-fast/gocmdb-front.git
  ```

- Build images

  ```shell
  cd gocmdb-front
  docker build --no-cache -t cmdb-fg:v0.1 .
  ```

- Run

  ```shell
  docker run --name cmdb_fg -d -p 80:8000 cmdb-fg:v0.1
  ```
  
  

## Show on browser

Modify hosts:

```shell
192.168.10.100   img.cmdb.com  go.cmdb.com cmdb.com
```

 

`http://go.cmdb.com`



![1591866160033](assets/1591866160033.png)



![1591866068374](assets/1591866068374.png)