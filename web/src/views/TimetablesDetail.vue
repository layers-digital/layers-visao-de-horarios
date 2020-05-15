<template>
  <div class="ls-container p-3 grey-10" style="min-height: 100%; overflow-y: auto !important; overflow-x: hidden; margin-top: 33px;">
<!--     <ProviderStatusUpdate :provider="selectedGradebook && selectedGradebook.provider" class="mt-2" />

    <div class="gradebook-course ls-d-flex ls-align-items-center" v-if="selectedGradebook">
      <span class="lead-light--text">{{ selectedGradebook.course }}</span>
    </div>

    <template v-if="selectedTerm >= 0 && selectedGradebook && subjects && subjects.length">
      <div class="gradebook-term ls-d-flex ls-align-items-start mt-3 mb-2">
        <span class="ls-flex-grow-1 grey-70--text">{{ selectedGradebook.terms[selectedTerm].label }}</span>
        <CurrentTerm
          class="ls-flex-grow-0 ls-flex-shrink-0 ml-2"
          v-if="isCurrentTerm"
        />
      </div>
      <SubjectCard
        v-for="(subject, i) in subjects"
        :key="i"
        :subject="subject"
        :expanded="subjectExpandableIndex == i"
        @expand="expand(i, $event)"
        class="mb-2"
      />
    </template>

    <template v-else-if="selectedTerm == 'attachments'">
      <AttachmentCard
        v-for="(attachment, i) in selectedGradebook.attachments"
        :key="i"
        :attachment="attachment"
      />
    </template> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import ProviderStatusUpdate from '@/components/ProviderStatusUpdate'
import SubjectCard from '@/components/SubjectCard'
import CurrentTerm from '@/components/CurrentTerm'

export default {
  name: 'TimetablesDetail',

  components: {
    // ProviderStatusUpdate,
    // SubjectCard,
    // CurrentTerm,
    // AttachmentCard
  },

  created() {
    // if(_.get(this.subjects, 'length', 0) == 1) {
    //   this.$store.commit('gradebooks/setSubjectExpandableIndex', 0)
    // }
  },

  computed: {
    // ...mapState('gradebooks', ['selectedGradebook', 'selectedTerm', 'subjectExpandableIndex']),

    // subjects() {
    //   if(!this.selectedGradebook) return []
    //   return this.selectedGradebook.terms[this.selectedTerm].subjects || []
    // },

    // isCurrentTerm() {      
    //   if(!_.get(this.selectedGradebook, 'terms.length', null)) return false
    //   if(this.selectedTerm === getCurrentTermIndex(this.selectedGradebook.terms)) {
    //     return true
    //   }

    //   return false
    // }
  },

  methods: {
    // expand(index, value) {
    //   if(!value) {
    //     this.$store.commit('gradebooks/setSubjectExpandableIndex', null)
    //     return
    //   }
    //   this.$store.commit('gradebooks/setSubjectExpandableIndex', index)
    // }
  }
}
</script>

<style scoped>
.gradebook-term {
  min-height: 24px;
  font-size: 16px;
}
.gradebook-course {
  min-height: 32px;
  font-size: 14px;
  line-height: 19px;
}
</style>