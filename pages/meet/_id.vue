<template>
  <v-container :fluid="roomCount > 1" v-if="roomDetails" class="fill-height">
    <v-row>
      <v-col cols="12" :md="roomCount == 1 ? '12' : roomCount == 2 ? '6' : '4'">
        <vue-plyr
          :style="{ height: roomCount == 1 ? '88vh' : '' }"
          data-poster="/icon.png"
          ref="myVideo"
        >
          <video id="myVideo" autoplay muted controls />
        </vue-plyr>
      </v-col>
      <template v-for="(user, i) in roomDetails.users">
        <v-col
          v-if="user.user != peer.id"
          :key="`user${user.user}-${i}`"
          :md="roomCount == 1 ? '12' : roomCount == 2 ? '6' : '4'"
          cols="12"
        >
          <vue-plyr data-poster="/icon.png">
            <video :ref="user.user" :id="user.user" autoplay muted controls />
          </vue-plyr>
          <span v-if="user.user === peer.id">My ID: {{ peer.id }}</span>
        </v-col>
      </template>
    </v-row>
    <v-footer color="transparent" padless app>
      <v-card width="100%" class="text-center pa-2" tile flat>
        <v-btn
          class="text-capitalize mr-2"
          color="primary"
          @click="showInfo = true"
          outlined
        >
          Details
        </v-btn>
        <v-btn class="text-capitalize" color="error" @click="leaveMeet">
          Leave
        </v-btn>
      </v-card>
    </v-footer>
    <MeetingCreatedDialog
      :link="roomLink"
      :meetId="$route.params.id"
      :show="showInfo"
      @CloseCreate="showInfo = false"
    />
  </v-container>
</template>

<script>
import socket from "~/plugins/socket.client";
export default {
  data() {
    return {
      peer: null,
      friendId: null,
      roomDetails: null,
      paused: false,
      showInfo: false,
    };
  },
  computed: {
    plyr() {
      let plyr = this.$refs.myVideo.player;
      plyr.on("pause", () => {
        this.paused = !this.paused;
      });
    },
    roomCount() {
      return this.roomDetails && this.roomDetails.users.length;
    },
    roomLink() {
      return window.location.href;
    },
  },
  mounted() {
    this.peer = this.$peerjs();

    // ** Socket Events **//
    //Listen for a new user
    socket.on("new-user", (id) => {
      this.$toast.info("A user joined", { icon: "mdi-account" });
    });
    //Listen when a user leaves
    socket.on("user-left", (id) => {
      // this.$toast.error("A user left", { icon: "mdi-account" });
    });
    //join room
    this.peer.on("open", (id) => {
      socket.emit("join-room", {
        userId: id,
        roomId: this.$route.params.id,
      });
    });

    //get room information
    socket.on("room-details", (data) => {
      this.roomDetails = data;
      for (let i = 0; i < data.users.length; i++) {
        const user = data.users[i];
        if (user.user !== this.peer.id) {
          this.makeConnection(user.user);
        }
      }
    });
    //handle incoming connection
    this.peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log(`Got this data from connection ${data}`);
      });
    });

    // // handle incomin videocall
    this.peer.on("call", async (call) => {
      console.log("Call coming in");
      try {
        let stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        call.answer(stream); //answer call
        call.on("stream", (stream) => {
          this.renderVideo(stream, call.peer);
        });
      } catch (error) {
        console.log(error);
      }
    });

    setTimeout(() => {
      this.renderMyVideo();
    }, 1500);
  },

  methods: {
    renderVideo(stream, id) {
      let vid = document.getElementById(id);
      vid.srcObject = stream;
    },
    async renderMyVideo() {
      let vid = document.getElementById("myVideo");
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      vid.srcObject = stream;
    },
    async makeConnection(id) {
      //get permission
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      let call = this.peer.call(id, stream);
      call.on("stream", (stream) => {
        this.renderVideo(stream, id);
      });
    },
    leaveMeet() {
      this.$toast.success("We hope you enjoyed your meeting", {
        icon: "mdi-check",
      });
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
