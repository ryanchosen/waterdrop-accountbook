import { VueConstructor } from "vue";
import Message from "./Message.vue";
import { MessageOption } from "./message-types";

export default {
  install: function(Vue: VueConstructor) {
    const container = document.createElement("div");
    container.id = "MessageContainer";
    document.body.appendChild(container);
    // eslint-disable-next-line
    const instance = new Vue(Message).$mount(container) as any; // TODO

    Vue.prototype.$message = function({ type, message, duration }: MessageOption) {
      instance.addMessage({ type, message, duration });
    };
  },
};
