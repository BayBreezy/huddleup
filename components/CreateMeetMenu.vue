<template>
  <div>
    <v-menu transition="fab-transition" :activator="activator" min-width="200">
      <v-card>
        <v-list nav>
          <v-list-item @click="createMeetingLink">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Create a session for later
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="startMeeting">
            <v-list-item-icon>
              <v-icon>mdi-shimmer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Start right now </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <MeetingCreatedDialog
      :link="link"
      :show="showCreate"
      :meetId="meetId"
      @CloseCreate="showCreate = false"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  props: {
    activator: String,
  },
  data() {
    return {
      link: null,
      showCreate: false,
      meetId: null,
    };
  },
  methods: {
    createMeetingLink() {
      const id = uuidv4();
      let meetingLink = `${window.location.href}${id}`;
      this.link = meetingLink;
      this.meetId = id;
      this.showCreate = true;
    },
    startMeeting() {
      const id = uuidv4();
      this.$router.push("/meet/" + id);
    },
  },
};
</script>

<style></style>
