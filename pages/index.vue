<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-spacer />
      <v-col md="4" cols="12">
        <h1 class="text-md-h2 text-h4 mb-6 mb-md-10">
          Stay in touch with who matters most
        </h1>
        <p class="text-md-h5 text-subtitle-1 font-weight-light">
          Create a huddle/meeting instantly.. or save the link for later
        </p>
        <br />
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="3">
            <v-btn
              block
              id="meetbtn"
              color="primary"
              class="text-capitalize"
              min-height="50"
            >
              Create Meeting
            </v-btn>
          </v-col>
          <v-col class="text-center" cols="12" md="1">
            <p class="mb-0 text-center">OR</p>
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              v-model="meetId"
              @keypress.enter="startMeeting"
              hint="Press enter to join"
              hide-details="auto"
              outlined
              placeholder="Room ID"
              label="Join a room"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
      <v-col v-if="$vuetify.breakpoint.mdAndUp" md="7" cols="12">
        <client-only>
          <VueSlick style="position: relative" v-bind="settings">
            <v-img
              class="rounded-lg"
              height="90vh"
              v-for="n in images"
              :key="n"
              :src="n"
            ></v-img>
          </VueSlick>
        </client-only>
      </v-col>
    </v-row>
    <CreateMeetMenu activator="#meetbtn" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetId: null,
      images: [
        "https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/8069402/pexels-photo-8069402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
      settings: {
        dots: true,
        arrows: false,
        edgeFriction: 0.35,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
      },
    };
  },
  methods: {
    startMeeting() {
      if (!this.meetId) return;
      this.$router.push("/meet/" + this.meetId);
    },
  },
};
</script>

<style scoded>
.slick-dots li button:before {
  font-size: 10px !important;
}
</style>
