import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'
import presetIcons from '@unocss/preset-icons'

// https://github.com/antfu/unocss
export default () =>
  Unocss({
    presets: [presetAttributify(), presetUno(), presetIcons()],
    shortcuts: [
      // you could still have object style
      {
        'btn': 'py-2 px-4 font-semibold rounded-lg',
      },
      // dynamic shortcuts
      [
        /^btn-(.*)$/,
        ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg border-0`,
      ],
    ],
  })
