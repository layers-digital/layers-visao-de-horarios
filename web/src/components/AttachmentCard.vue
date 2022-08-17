<template>
  <div
    class="attachment-card p-2 grey-20 ls-d-flex ls-align-items-center cursor-pointer"
    @click="
      openAttachment(attachment.url, attachment.title || 'file-' + Date.now())
    "
  >
    <div
      class="mr-2 attachment-icon link ls-d-flex ls-align-items-center ls-justify-content-center"
    >
      <img src="@/assets/paperclip.svg" width="12" height="12" />
    </div>
    <div class="attachment-title link--text ls-flex-grow-1 f-12">
      {{ attachment.title }}
    </div>
  </div>
</template>
<script type="text/javascript">
import downloadFile from "@/helpers/downloadFile";

export default {
  name: "AttachmentCard",

  props: {
    attachment: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async openAttachment(url, title) {
      if (this.attachment.type == "link") {
        return await window.LayersPortal("go", url);
      }
      return downloadFile(url, title);
    },
  },
};
</script>

<style type="text/css" scoped>
a.attachment-link {
  text-decoration: none;
  display: block;
}
.attachment-card {
  border-radius: 4px;
  min-height: 40px;
  width: 100%;
  text-decoration: none;
}
.attachment-icon {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}
.attachment-title {
  font-weight: 600;
}
</style>
