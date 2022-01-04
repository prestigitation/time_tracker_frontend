import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useShortcuts() {
    const {t} = useI18n()
    let shortcuts = ref([
        {
            text: t('tasks.picker.today'),
            value: new Date(),
        },
        {
            text: t('tasks.picker.tomorrow'),
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24)
                return date
            },
        },
        {
            text: t('tasks.picker.3days'),
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
                return date
            }
        },
        {
            text: t('tasks.picker.week'),
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                return date
            },
        },
    ])
    return {shortcuts}
}