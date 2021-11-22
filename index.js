// components/diabetToast/index.js
import { commonImg } from '../../config/imgConf'
Component({
  /**
   * Component properties
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    show: Boolean,
    mask: Boolean,
    type: {
      type: String,
      default: '',
      observers: function(val) {
        if(val === 'info') {
          this.setData({
            icon: commonImg.icon_toast_info
          })
        }
      }
    },
    text: {
      type: String,
      default: ''
    }
  },

  /**
   * Component initial data
   */
  data: {
    icon: commonImg.icon_toast_success
  },

  /**
   * Component methods
   */
  methods: {

  }
})
