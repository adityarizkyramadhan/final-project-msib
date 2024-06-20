# Message Bus
## Pembukaan
Message bus adalah wrapper untuk rabbitMQ. mempermudah penggunaan rabbitMQ dengan Pub/Sub model.
## Bagaimana menggunakanya?


```
var messageBus = require(./message-bus)
```
Disini kita hanya perlu require folder message bus(bukan message-bus.js melainkan index.js)

message-bus.js adalah file dimana helper functions di definisikan.



## Subscribe

service atau apps dapat subscribe terhadap event dengan mendefinisikan nama event yang akan di dengarkan dan menyertakan fungsi handler untuk menangani event tersebut.

Untuk menambahkan subscriber buat file dalam folder ```./message-bus/subscribers```

contoh:
```
async function handlerFunction(msg){
  console.log(" [x] Received %s", msg.content.toString());

  function delay(t, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
  }

  await delay(5000);
}

module.exports = {
  key: "jurnal_umum.create",
  handler: handlerFunction
}

```

disini dibagi jadi 2 part:
1. fungsi handler untuk event yg akan d subscribe
2. module.exports dengan bentuk:
```
{
  key: <nama event yg akan di subscribe>,
  handler: fungsi yang akan menghandle event
}
```

Notes: Library ini akan dengan otomatis mendaftarkan daftar subscriber saat index.js di-include. 