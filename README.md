# Github Türkiye İstatistikleri

Github üzerinde konumu Türkiye olarak gözüken **12,384** geliştirici ve **35,591** repo üzerinde gerçekleştirilen bir istatistik çalışmasıdır.

https://alpcanaydin.github.io/github-stats-for-turkey

![map](https://cloud.githubusercontent.com/assets/1801024/24866687/9951125c-1e13-11e7-996c-92addcddd8a2.jpg)

> Eğer istatistikleriniz yanlış bir şehirde gözüküyorsa düzeltilmesi için [issue](https://github.com/alpcanaydin/github-stats-for-turkey/issues/new) açabilirsiniz.

# Bilgiler

* Şehirlerde bulunan sıralama verisi o şehirdeki kullanıcıların toplam star ve takipçi sayısına göre belirlenmiştir.
* Geliştiricilerin Türkiye genelindeki ve şehirlerdeki sıralama durumları geliştiricinin toplam star ve takipçi sayısına göre belirlenmiştir.
* Fork'lanmış repo'lar verilere dahil edilmemiştir.

# Kurulum

Bilgisayarınızda `Node.js v7` kurulu olması gerekmektedir.

Bu repoyu clone'ladıktan sonra `server` klasörü içinde bulunan `config.json.example` dosyasını `config.json` olarak kopyalayıp içine gerekli bilgileri ekleyin. Daha sonra `server` klasöründe sırasıyla aşağıdaki komutları çalıştırın.

```bash
yarn
node bin/fetchUsers.js
node bin/fetchUserDetails.js
node bin/fetchRepos.js
node bin/saveUsers.js
node bin/removeUserDuplications.js
node bin/saveRepos.js
node bin/removeRepoDuplications.js
node bin/saveUserStars.js
node bin/saveRepoCities.js
node bin/saveUserScores.js
node bin/saveLocations.js
```

Bu klasörde `node app.js` komutunu çalıştırdığınızda `3001` portunda API çalışır hale gelecektir.

React uygulamasını kurmak için ise sırasıyla aşağıdaki komutları `app` klasöründe çalıştırın.

```bash
yarn
yarn start
```

Eğer sadece `React` uygulamasında geliştirme yapacaksanız uygulamayı aşağıdaki komutla başlatarak API'yı direkt
çalışır hale getirebilirsiniz:

```bash
REACT_APP_API_URL=https://github-stats.alpcanaydin.com yarn start
```

# Katkıda Bulunanlar

* [@serkanerip](https://github.com/serkanerip)
* [@unexge](https://github.com/unexge)
* [@hsnaydd](https://github.com/hsnaydd)
* [@gokmen](https://github.com/gokmen)
