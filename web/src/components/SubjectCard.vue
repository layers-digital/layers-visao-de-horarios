<template>
  <div class="subject-card white grey-70-light-outline">
    <div class="expansion-header ls-d-flex ls-align-items-center px-3" @click="$emit('expand', !expanded)">
      <div class="ls-flex-grow-0 ls-d-flex mr-3">
        <img src="@/assets/arrow-up.svg" v-if="expanded" />
        <img src="@/assets/arrow-down.svg" v-else />
      </div>
      <div class="ls-flex-grow-1 subject-label" :class="expanded ? 'expanded' : ''">
        <span class="purple--text bold" :class="!expanded ? 'ellipsis-1' : ''">
          {{ subject.label }}
        </span>
      </div>
      <div class="ml-3 ls-flex-grow-0" v-if="featuredOverall">

      </div>
    </div>
    <TransitionExpand>
      <div class="expansion-content grey-30-outline px-3" v-if="expanded">

        opa
      </div>
    </TransitionExpand>
  </div>
</template>

<script type="text/javascript">
import TransitionExpand from '@/components/TransitionExpand'
import _ from 'lodash'

export default {
  name: "SubjectCard",

  components: {
    TransitionExpand,
  },

  props: {
    subject: {
      type: Object,
      required: true
    },

    expanded: {
      type: Boolean
    }
  },

  computed: {
    featuredOverall() {
      return this.subject.overall.find(o => o.featured)
    },

    categoriesHydrated() {
      let categories = []

      // hydrate category if has categories array
      if(_.get(this.subject, 'categories.length', 0)){
        for(let i = 0; i < this.subject.categories.length; i++){
          let category = this.subject.categories[i]
          category.activities = []

          let filteredActivities = this.subject.activities.filter((activity) => activity.category == category.name)
          category.activities = [...filteredActivities]

          categories.push(category)
        }
        categories = _.sortBy(categories, 'order')
      }

      // group categories to iterate
      let grouppedCategories = _.groupBy(this.subject.activities, 'category')
      let cats = Object.keys(grouppedCategories)

      // filter categories that are already in the "categories" key
      cats.forEach((c, i) => {
        if(categories.find(cat => cat.name == c)) cats.splice(i, 1)
      })

      let activitiesWithoutCategory = {}
      for(let i = 0; i < cats.length; i++){
        let cat

        // Group all activities if doesn't have category in one category
        if(!String(cats[i]).trim() || cats[i] == 'null' || cats[i] == 'undefined'){
          _.set(activitiesWithoutCategory, 'name', null)

          // increment in array of activities
          if(_.get(activitiesWithoutCategory, 'activities.length', 0)) {
            activitiesWithoutCategory.activities.push(...grouppedCategories[cats[i]])
          } else {
            // set array of activities
            _.set(activitiesWithoutCategory, 'activities', grouppedCategories[cats[i]])
          }
        } else {
          cat = { name: cats[i], activities: grouppedCategories[cats[i]] }
          categories.push(cat)
        }
      }

      if(!_.isEmpty(activitiesWithoutCategory)) categories.push(activitiesWithoutCategory)

      return categories
    },
  },
}
</script>

<style type="text/css" scoped>
.subject-card {
  min-height: 56px;
  border-radius: 12px;
  width: 100%;
  border: 1px solid;
  overflow: hidden;
}
.expansion-header {
  min-height: 56px;
}
.expansion-content {
  border-top: 1px solid;
}
.subject-label {
  height: 40px;
  display: flex;
  align-items: center;
}
.subject-label.expanded {
  padding-top: 16px;
  min-height: 56px;
  padding-bottom: 16px;
  height: initial;
}
.subject-label > span {
  line-height: 18px;
  font-size: 16px;
}

.overall-section {
  margin-left: -16px;
  margin-right: -16px;
  background-color: #FAFAFA;
}
.overall {
  height: 32px;
}
</style>