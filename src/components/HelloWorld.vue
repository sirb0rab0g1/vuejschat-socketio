<template>
  <v-container fluid>
    {{ messages }}
    <!-- <ul v-for="(item, index) in messages" :key="index">
      <ul>
        {{ item }}
      </ul> -->
    </ul>

    <v-text-field v-model="msg" />
    <v-btn @click="send()">SEND</v-btn>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'

  export default {
    data: () => ({
      messages: null,
      msg: ''
    }),
    /* sockets: {
        connect () {
          console.log('were fuckin connected')
        },
        channel_name (payload) {
            console.log(data)
        }
    }, */
    methods: {
      send () {
        axios.post('http://192.168.0.199:8000/api/post', {message: this.msg}).then(data => {
          // console.log(data)
          this.subs()
        }).catch(data => {
          console.log(data)
        })
      },
      subs () {
        Echo.channel('laravel_database_channelname').listen('examplee', (e) => {
          this.manual()
        });
      },
      manual () {
        axios.get('http://192.168.0.199:8000/api/getAll').then(({data}) => {
          this.messages = data
        });
      }
    },
    mounted () {
      this.subs()
    },
    created() {
      this.manual()
      Echo.connector.socket.on('connect', (_) => console.log('connected'));
    }
  }
</script>
