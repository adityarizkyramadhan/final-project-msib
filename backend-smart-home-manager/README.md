# Hackfest 2024 Ciputra University

## Description

Lorem ipsum

## Team Members

Lorem ipsum

## Docs
1. [Auth API](#auth-api)
2. [Banner API](#banner-api)
3. [Ruangan](#ruangan)
4. [Pengaturan Awal](#pengaturan-awal)
5. [Chat Bot](#chat-bot)

### Base Environment

Base environment for this http request is `http://localhost:3000`. You can change it to your own environment.

```http
@BASE_URL=http://localhost:3000
@TOKEN=your_token
```

### Auth API

This auth API is used to register and login user. The user will get a token after successfully login and the token will be used to access other API.

#### Register Request

Body request to login user.
```http
### Create a new user
POST {{BASE_URL}}/auth/register
Content-Type: application/json

{
  "email": "adityarizky1020@gmail.com",
  "password": "password123",
  "complete_name": "Aditya Rizky"
}
```

Response after successfully register user.

Status code: `201 Created`
```json
{
	"message": "User created",
	"data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQxNDMwNzUsImV4cCI6MTcxNDIyOTQ3NX0.061xoYYecgOyvjQ0xtM-f6KHERNeWo1Pg_6IRL_I6tg"
}
```

#### Login Request

Body request to login user.
```http
### Login user
POST {{BASE_URL}}/auth/login
Content-Type: application/json

{
  "email": "adityarizky1020@gmail.com",
  "password": "password123"
}
```

Response after successfully login user.

Status code: `200 OK`
```json
{
  "message": "Login success",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsImlhdCI6MTcxNDE0NDUzNywiZXhwIjoxNzE0MjMwOTM3fQ.44YCK4aGhUyNO4HGZa1TxPrjXN3Sf4xGg3xvOON8mXQ"
}
```

### Banner API

This banner API is used to get all banners.

#### Get All Banners Request

Request to get all banners.
```http
GET {{BASE_URL}}/banner
Accept: application/json
```

Response after successfully get all banners.

Status Code: `200 OK`
```json
{
  "message": "Banners retrieved",
  "data": [
    {
      "id": "2b73e2a4-e8ac-4712-b815-16904e350969",
      "link": "https://is3.cloudhost.id/storage-foto/ciputra-banner/Item2.png"
    },
    {
      "id": "38a2b92c-f1a6-40ea-baca-0eb779f07131",
      "link": "https://is3.cloudhost.id/storage-foto/ciputra-banner/Item3.png"
    },
    {
      "id": "66e267ae-0955-455c-a567-9ca9f5013528",
      "link": "https://is3.cloudhost.id/storage-foto/ciputra-banner/Item1.png"
    }
  ]
}
```

### Ruangan

This ruangan API is used to get all ruangan.

#### Get All Ruangan Request

Request to get all ruangan.
```http
GET {{BASE_URL}}/ruangan
Accept: application/json
```

Response after successfully get all ruangan.

Status Code: `200 OK`
```json
{
  "message": "Ruangans retrieved",
  "data": [
    {
      "id": "14008517-e6da-4211-beb0-8d058af0bcd7",
      "name": "Ruang Tamu",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "36e81977-8775-4e2a-bb30-04969ee7b7be",
      "name": "Kolam Renang",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "5a83db6e-fbbf-4622-9676-187fc1187c47",
      "name": "Ruang Mandi",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "5aa84164-9e2d-404f-b685-b57e042c883c",
      "name": "Garasi",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "6adb5370-4824-4877-87f1-e742114ebc4e",
      "name": "Ruang Parkir",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "6b574201-fae1-4b2a-ade3-e33ce840f147",
      "name": "Ruang Keluarga",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "6bf79242-41ce-4247-8c4a-c239e9a3c9d8",
      "name": "Gudang",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "7ffeb9c9-33fd-4323-b735-4af562ab727d",
      "name": "Ruang Jemur",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "838a6553-b6a7-4d39-8462-5606406870c6",
      "name": "Ruang Kerja",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "94d76e4b-f6d8-4dc7-8451-e35ddd518486",
      "name": "Ruang Tidur",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "a79e8c64-a4a8-4cd2-81d1-5f916df8f935",
      "name": "Ruang Dapur",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "bf6dae4f-1584-4f9e-9ae2-4a55b0c1e00b",
      "name": "Ruang Fitness",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "c39f8f73-dcbb-4d9a-a8b2-70d0f9a0e5e9",
      "name": "Taman",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "c66ec70d-4ce7-4c2c-b529-f371c19e62a9",
      "name": "Ruang Musik",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "e494df55-c26b-4dc9-91d5-2ce7c31af1c3",
      "name": "Ruang Belajar",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "eb87c9dd-06c7-4388-9237-69c669975379",
      "name": "Ruang Makan",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    },
    {
      "id": "eccfe996-8a0f-452e-b7f5-d265769acb36",
      "name": "Ruang Cuci",
      "user_id": null,
      "created_at": "2024-04-26T17:40:31.000Z",
      "updated_at": "2024-04-26T17:40:31.000Z"
    }
  ]
}
```

### Pengaturan Awal

To complete user data for daily electricity use

#### Create pengaturan awal

Request body

```http
POST {{BASE_URL}}/informasi-listrik
Authorization: Bearer {{TOKEN}}
Accept: application/json
Content-Type: application/json

{
  "daya": "contoh_daya",
  "jenis_pembayaran": "contoh_jenis_pembayaran",
  "perangkat_listrik": [
    {
      "jenis_perangkat": "contoh_jenis_perangkat_1",
      "jenis_inverter": "contoh_jenis_inverter_1",
      "jumlah": 2,
      "daya_listrik": 100,
      "lama_pemakaian": 5
    },
    {
      "jenis_perangkat": "contoh_jenis_perangkat_2",
      "jenis_inverter": "contoh_jenis_inverter_2",
      "jumlah": 3,
      "daya_listrik": 200,
      "lama_pemakaian": 6
    }
  ]
}
```

Example Response

Status Code: `201 Created`
```json
{
  "message": "Informasi listrik created",
  "data": {
    "informasiListrik": {
      "id": "5248848a-be8d-4ef3-ac82-7ed8b397bd5b",
      "daya": "900",
      "jenis_pembayaran": "contoh_jenis_pembayaran",
      "user_id": "98e83ff5-1881-4a4e-bc90-0a2cacd74c5e",
      "updated_at": "2024-04-28T00:05:37.629Z",
      "created_at": "2024-04-28T00:05:37.629Z"
    },
    "perangkatListrik": [
      {
        "id": "bc503854-c1df-40ce-9b1d-4b275fee6d7a",
        "jenis_perangkat": "AC Inverter",
        "jumlah": 5,
        "daya_listrik": 500,
        "lama_pemakaian": 9,
        "user_id": "98e83ff5-1881-4a4e-bc90-0a2cacd74c5e",
        "created_at": "2024-04-28T00:05:37.841Z",
        "updated_at": "2024-04-28T00:05:37.841Z"
      },
      {
        "id": "84c7e50a-337b-47e5-b7ba-304657691663",
        "jenis_perangkat": "Lampu LED",
        "jumlah": 10,
        "daya_listrik": 20,
        "lama_pemakaian": 10,
        "user_id": "98e83ff5-1881-4a4e-bc90-0a2cacd74c5e",
        "created_at": "2024-04-28T00:05:37.841Z",
        "updated_at": "2024-04-28T00:05:37.841Z"
      }
    ],
    "response_ai": {
      "total_kwh": "Total daya listrik yang kamu gunakan dalam sebulan adalah 4.050 kWh",
      "biaya": "Estimasi biaya listrik bulanan kamu saat ini adalah sekitar Rp 5.475.600 per bulan",
      "co2": "Estimasi emisi CO2 yang dihasilkan oleh perangkat listrik kamu adalah sekitar 5.785 kgCO2 per bulan",
      "informasi_listrik_id": "5248848a-be8d-4ef3-ac82-7ed8b397bd5b"
    }
  }
}
```

#### Check is complete

Request body

```http
GET {{BASE_URL}}/informasi-listrik/check-is-complete
Authorization: Bearer {{TOKEN}}
Accept: application/json
```

Example Response

Status Code: `200 OK`

```json
{
  "message": "Check is complete",
  "data": {
    "is_complete": true
  }
}
```

### Device IOT

#### Create Device IOT

Request body to create device IOT.
```http
POST {{BASE_URL}}/device-iot
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "id": "contoh_id_an",
  "name": "contoh_nama",
  "jenis_perangkat": "contoh_jenis_perangkat",
  "daya_listrik": 100,
  "ruangan": "contoh_ruangan",
  "mode": "contoh_mode",
  "config": {
    "contoh_config": "contoh_config"
  }
}
```

response

Status Code: `201 Created`
```json
{
  "message": "Device created",
  "data": {
    "created_at": "2024-04-27T04:02:45.036Z",
    "updated_at": "2024-04-27T04:02:45.037Z",
    "id": "contoh_id_an_1",
    "name": "contoh_nama",
    "jenis_perangkat": "contoh_jenis_perangkat",
    "daya_listrik": 100,
    "ruangan": "contoh_ruangan",
    "mode": "contoh_mode",
    "config": {
      "contoh_config": "contoh_config"
    },
    "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e"
  }
}
```

#### Get All Device IOT

Request to get all device IOT.
```http
### Get All Device IoT
GET {{BASE_URL}}/device-iot
Authorization: Bearer {{TOKEN}}
```

Response after successfully get all device IOT.

Status Code: `200 OK`
```json
{
  "message": "Devices retrieved",
  "data": [
    {
      "id": "contoh_id_an_1",
      "name": "contoh_nama",
      "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e",
      "jenis_perangkat": "contoh_jenis_perangkat",
      "is_on": true,
      "daya_listrik": 100,
      "ruangan": "contoh_ruangan",
      "mode": "contoh_mode",
      "config": "{\"contoh_config\":\"contoh_config\"}",
      "created_at": "2024-04-27T04:02:45.000Z",
      "updated_at": "2024-04-27T04:02:45.000Z",
      "deleted_at": null
    },
    {
      "id": "contoh_id_an",
      "name": "contoh_nama",
      "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e",
      "jenis_perangkat": "contoh_jenis_perangkat",
      "is_on": true,
      "daya_listrik": 100,
      "ruangan": "contoh_ruangan",
      "mode": "contoh_mode",
      "config": "{\"contoh_config\":\"contoh_config\"}",
      "created_at": "2024-04-27T03:38:45.000Z",
      "updated_at": "2024-04-27T03:38:45.000Z",
      "deleted_at": null
    },
    {
      "id": "contoh_id",
      "name": "contoh_nama",
      "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e",
      "jenis_perangkat": "contoh_jenis_perangkat",
      "is_on": false,
      "daya_listrik": 100,
      "ruangan": "contoh_ruangan",
      "mode": "contoh_mode",
      "config": null,
      "created_at": "2024-04-27T03:38:21.000Z",
      "updated_at": "2024-04-27T17:06:41.000Z",
      "deleted_at": null
    }
  ]
}
```

#### Get Device IOT by ID

Request to get device IOT by ID.
```http
### Get Device IoT by ID
GET {{BASE_URL}}/device-iot/{{device_id}}
Authorization: Bearer {{TOKEN}}
```

Response after successfully get device IOT by ID.

Status Code: `200 OK`
```json
{
  "message": "Device retrieved",
  "data": {
    "id": "contoh_id_an",
    "name": "contoh_nama",
    "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e",
    "jenis_perangkat": "contoh_jenis_perangkat",
    "daya_listrik": 100,
    "ruangan": "contoh_ruangan",
    "mode": "contoh_mode",
    "config": "{\"contoh_config\":\"contoh_config\"}",
    "created_at": "2024-04-27T03:38:45.000Z",
    "updated_at": "2024-04-27T03:38:45.000Z",
    "deleted_at": null
  }
}
```

#### Update Status Device IOT

Request to update status device IOT.
```http
### Update Status Device IoT
PUT {{BASE_URL}}/device-iot/status?id=contoh_id&status=false
Authorization: Bearer {{TOKEN}}
Accept: application/json
```

Response after successfully update status device IOT.

Status Code: `200 OK`
```json
{
  "message": "Device status updated",
  "data": {
    "0": 1,
    "log": {
      "created_at": "2024-04-27T17:06:41.328Z",
      "id": "5cc141d5-ad01-4079-aafd-dbd4e38744d5",
      "device_id": "contoh_id",
      "status": "mati"
    }
  }
}
```

#### Create IOT

```http
POST {{BASE_URL}}/device-iot/iot
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "device_id" : "device_id_ini",
  "fcm_token" : "fcm_token_ini"
}
```

Response after successfully create IOT.
```json
{
  "message": "IoT created",
  "data": {
    "id": "61ec2cc2-7637-423b-a3f8-0c0bfdef1279",
    "device_id": "device_id_ini",
    "fcm_token": "fcm_token_ini"
  }
}
```

#### Update FCM token

```http
PUT {{BASE_URL}}/device-iot/fcm-token/61ec2cc2-7637-423b-a3f8-0c0bfdef1279
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "fcm_token" : "fcm_token_ini_2"
}
```

Response after successfully update FCM token.
```json
{
  "message": "Device updated",
  "data": [
    1
  ]
}
```

#### Get IoT all

```http
GET {{BASE_URL}}/device-iot/iot
Authorization: Bearer {{TOKEN}}
```

Response after successfully get IoT by Device ID.
```json
{
  "message": "IoT retrieved",
  "data": [
    {
      "id": "61ec2cc2-7637-423b-a3f8-0c0bfdef1279",
      "device_id": "device_id_ini",
      "fcm_token": "fcm_token_ini_2"
    }
  ]
}
```

#### Get IoT by ID

```http
### Get IoT Data By Id
GET {{BASE_URL}}/device-iot/iot/61ec2cc2-7637-423b-a3f8-0c0bfdef1279
Authorization: Bearer {{ TOKEN }}
```

Response after successfully get IoT by ID.
```json
{
  "message": "IoT retrieved",
  "data": {
    "id": "61ec2cc2-7637-423b-a3f8-0c0bfdef1279",
    "device_id": "device_id_ini",
    "fcm_token": "fcm_token_ini_2"
  }
}
```



### Chat Bot

This chat bot API is used to chat with bot.

#### Create Chat Bot

Request to get all chat bot.
```http
POST {{BASE_URL}}/chat
Content-Type: application/json
Authorization: Bearer {{TOKEN}}

{
  "prompt": "Bagaimana cara menghemat listrik?"
}
```

Response after successfully get all chat bot.

Status Code: `200 OK`
```json
{
  "message": "Chat retrieved",
  "data": "Menggunakan lampu hemat energi, mematikan perangkat elektronik saat tidak digunakan, dan menggunakan perangkat hemat energi lainnya."
}
}
```


#### Get All Chat Bot

Request to get all chat bot.
```http
GET {{BASE_URL}}/chat
Authorization: Bearer {{TOKEN}}
```

Response after successfully get all chat bot.

Status Code: `200 OK`
```json
{
  "message": "Chat retrieved",
  "data": [
    {
      "id": "14631b7c-0370-4c9a-8283-00e709444b74",
      "cluster_id": "37a0805f-48b5-4bc3-802d-e5d64f1dc2b1",
      "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e",
      "message": "🔍 Pertanyaan Klarifikasi: Apakah Anda memiliki pertanyaan terkait manajemen listrik atau EcoSwitch?\n\nSebagai asisten EcoSwitch, fokus kami adalah pada topik tentang penghematan listrik dan manajemen energi. Jika Anda memiliki pertanyaan terkait topik tersebut, saya akan dengan senang hati membantu Anda. Jika tidak, mungkin saya bisa membantu mengarahkan Anda ke sumber informasi yang tepat tentang pertanyaan Anda terkait kota Paris.",
      "role": "assistant",
      "created_at": "2024-04-27T08:41:10.000Z",
      "updated_at": "2024-04-27T08:41:10.000Z",
      "createdAt": "2024-04-27T08:41:10.000Z",
      "updatedAt": "2024-04-27T08:41:10.000Z"
    },
    {
      "id": "eb0ab0cf-55c0-4920-a9c5-4192441164d0",
      "cluster_id": "97c26f0c-c918-469c-ba13-72fcfad1fe8c",
      "user_id": "052afb61-e219-4dd9-9a9a-1f1d7a12485e",
      "message": "What is the capital of France?",
      "role": "user",
      "created_at": "2024-04-27T08:41:10.000Z",
      "updated_at": "2024-04-27T08:41:10.000Z",
      "createdAt": "2024-04-27T08:41:10.000Z",
      "updatedAt": "2024-04-27T08:41:10.000Z"
    }
  ]
}
```


