import { FormSearch } from '@/types/common'
// import $ from 'jquery'

export const datetimepicker = (dateFields: string[], form: FormSearch, type: string, format: string = 'Y/m/d H:i') => {
    if (dateFields) {
        dateFields.forEach((item, index) => {
            const isFromField = index % 2 === 0
            const otherIndex = isFromField ? index + 1 : index - 1
            const getKey = isFromField ? 'minDateTime' : 'maxDateTime'
            const getKey2 = isFromField ? 'maxDateTime' : 'minDateTime'
            const valueDate = form[item] || ''
            const valueDateMinMax = form[dateFields[otherIndex]] || ''
            const minMax = valueDateMinMax ? { [getKey2]: valueDateMinMax } : {}

            $.datetimepicker.setLocale('ja')
            $(`#${item}_${type}`).datetimepicker({
                value: valueDate,
                ...minMax,
                className: `${item}_popup_${type}`,
                defaultSelect: false,
                scrollInput: false,
                scrollMonth: false,
                timepicker: format !== 'Y/m/d' && format !== 'Y-m-d',
                format,
                onChangeDateTime: function (_db: unknown, $input: JQuery) {
                    const value = $input.val()
                    let options = {}
                    if (value) {
                        options = {
                            value: $(`#${dateFields[otherIndex]}_${type}`).val(),
                            [getKey]: value,
                        }
                    }
                    $(`#${dateFields[otherIndex]}_${type}`).datetimepicker(options)
                },
            })

            const clearButton = $(`#${item}_clear_${type}`)

            clearButton.click(() => {
                $(`#${item}_${type}`).val('').trigger('change')
                // form[item] = ''
                $(`#${dateFields[otherIndex]}_${type}`).datetimepicker({
                    value: $(`#${dateFields[otherIndex]}_${type}`).val(),
                    [getKey]: new Date(isFromField ? 0 : 8640000000000000),
                })
            })
        })
    }
}
