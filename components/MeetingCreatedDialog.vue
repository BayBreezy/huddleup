<template>
  <div>
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      v-model="dialog"
      width="550"
    >
      <v-card>
        <v-btn @click="dialog = false" icon absolute top right>
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="text-h5"> Meeting Details </v-card-title>
        <v-card-text>
          <p class="text-subtitle-1 mb-7">
            Here are the details of your meeting
          </p>

          <label for="">Meeting Link</label>
          <v-text-field
            append-icon="mdi-content-copy"
            ref="meetingLink"
            @focus="$event.target.select()"
            solo-inverted
            flat
            @click:append="copyLink"
            readonly
            :value="link"
          ></v-text-field>
          <label for="">Room ID</label>
          <v-text-field
            append-icon="mdi-content-copy"
            ref="meetingId"
            @focus="$event.target.select()"
            solo-inverted
            flat
            @click:append="copyId"
            readonly
            :value="meetId"
          ></v-text-field>
          <v-btn
            depressed
            color="primary"
            :href="`mailto:?body=Hey%2C%0D%0A%0D%0AJoin%20me%20for%20a%20meeting%20here%3A%0D%0A%0D%0A${link}`"
            >Mail Link</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    show: Boolean,
    meetId: String,
  },
  methods: {
    copyLink() {
      this.$refs.meetingLink.focus();
      document.execCommand("copy");
      this.$toast.success("Link Copied", {
        icon: "mdi-check",
      });
      this.$refs.meetingLink.blur();
    },
    copyId() {
      this.$refs.meetingId.focus();
      document.execCommand("copy");
      this.$toast.success("Room ID Copied", {
        icon: "mdi-check",
      });
      this.$refs.meetingId.blur();
    },
  },
  computed: {
    dialog: {
      get() {
        return this.show;
      },
      set(v) {
        this.$emit("CloseCreate");
      },
    },
  },
};
</script>

<style></style>
