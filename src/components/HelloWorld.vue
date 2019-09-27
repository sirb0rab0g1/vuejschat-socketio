<template>
  <v-container fluid>

    <v-snackbar
      :timeout="2000"
      top
      v-model="snackbar"
    >
      Naay bag.ong message ni abot pasmo mo tanan
    </v-snackbar>
    <v-container
      id="scroll-target"
      style="max-height: 400px"
      class="scroll-y"
    >
      <v-layout
        v-scroll:#scroll-target="onScroll"
        column
        align-center
        justify-center
        style="height: 1000px"
      >
      <v-list three-line>
          <template v-for="(item, index) in messages">
            <v-list-tile>
              <v-list-tile-avatar>
                <img src="https://scontent.fmnl7-1.fna.fbcdn.net/v/t1.15752-9/70453362_546492816099916_3977100704908050432_n.png?_nc_cat=109&_nc_oc=AQl7NflOnA0saHz7a9NTIdQZRHXonajm_DYgMVH_uA7QzjJyZY-5KPhR2gV1h4nPogY&_nc_ht=scontent.fmnl7-1.fna&oh=5a1bb2dc37839308d3eea91eb35c9b98&oe=5E3252F3">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title v-html="item"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-layout>
    </v-container>

    <v-text-field v-model="msg" v-on:keyup.enter="send"/>
    <v-btn @click="send()">SEND</v-btn>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'

  export default {
    data: () => ({
      messages: null,
      msg: '',
      snackbar: false,
      offsetTop: 0
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
          this.msg = ''
        }).catch(data => {
          console.log(data)
        })
      },
      subs () {
        Echo.channel('laravel_database_channelname').listen('examplee', (e) => {
          this.manual()
          this.snackbar = true
        });
      },
      manual () {
        axios.get('http://192.168.0.199:8000/api/getAll').then(({data}) => {
          this.messages = data
        });
      },
      onScroll (e) {
        let target = e.target
        target.scrollTop = target.scrollHeight
        console.log(target.scrollTop + target.offsetHeight >= target.scrollHeight)
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
