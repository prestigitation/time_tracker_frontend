<template>
<span class="time__wrapper">
    <span class="time__buttons">
        <span v-if="!is_recording" class="time__buttons_button">
            <video-play color="green" width="20" height="20" @click.prevent="startRecording" />
        </span>
        <span v-else class="time__buttons_button">
            <video-pause color="red" width="20" height="20" @click.prevent="stopRecording" />
        </span>
    </span>
    <span>{{sync_time}}</span>
    </span>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, watch, onBeforeUnmount, onBeforeMount } from "vue"
import {
    VideoPause,
    VideoPlay,
} from '@element-plus/icons-vue'
export default defineComponent({
    name: 'time',
    components: {
        VideoPause,
        VideoPlay
    },
    emits: [
        'sync_time'
    ],
    setup(props, {emit}) {
        const is_recording = ref(false)
        let sender 
        const minutes = reactive({
            value: '00',
            limit: 60,
            start: '00'
        })
        const hours = reactive({
            value: '00',
            limit: 100,
            start: '00'
        })
        const seconds = reactive({
            value: '00',
            limit: 60,
            start: '00'
        })
        const sync_time = computed(() => {
            return `${hours.value}:${minutes.value}:${seconds.value}`
        })

        const startRecording = () => {
            is_recording.value = true
        }
        
        const stopRecording = () => {
            is_recording.value = false
            emit('sync_time', sync_time.value)
        }

        onBeforeMount(() => {
            if(props.time) {
                let timeParts = props.time.split(':')
                hours.value = timeParts[0]
                minutes.value = timeParts[1]
                seconds.value = timeParts[2]
            }
        })

        onBeforeUnmount(() => {
            stopRecording()
        })

        watch(() => is_recording.value, (prevValue: Boolean, currentValue: Boolean) => {
            if(prevValue) {
                sender = setInterval(() => {
                let newSecond = parseInt(seconds.value) + 1
                if(newSecond === seconds.limit) {
                    let newMinute = parseInt(minutes.value) + 1
                    if(newMinute === hours.limit) {
                        let newHour = parseInt(hours.value) + 1
                        hours.value = parseNewTime(hours.limit.toString().length, newHour)
                        minutes.value = minutes.start
                        seconds.value = seconds.start
                    } else {
                        minutes.value = parseNewTime(minutes.limit.toString().length, newMinute)
                        seconds.value = seconds.start
                    }
                } else {
                    seconds.value = parseNewTime(seconds.limit.toString().length, newSecond)
                }
            } , 1000)
            } else clearInterval(sender)
        })

        function parseNewTime(numberOfDigits: number, currentValue: number): string {
            if(numberOfDigits === currentValue.toString().length) {
                let res = currentValue
                return res.toString()
            }
            let result = ''
            for(let i = 0 ; i < numberOfDigits - 1; i++) {
                result += '0'
            }
            return result + currentValue
        }

        /* 
            TODO: parse minutes, seconds i td
            TODO: sync time after stopping
            TODO: сделать заполнение времени в отображении нулями (до длины value)
        */
        
        return {
            sync_time, 
            is_recording,
            hours, 
            minutes, 
            seconds, 
            
            
            startRecording,
            stopRecording,
        }
    },
    props: ['time']
})
</script>
<style lang="scss" scoped>
.time {
    &__wrapper {
        display: flex;
    }
    &__buttons {
        margin-left: 7.5px;
        margin-right: 7.5px;
        &_button:hover {
            cursor: pointer;
        }
    }
}
</style>