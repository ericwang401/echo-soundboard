// @ts-ignore
import ReactGA from '@/util/AnalyticsWrapper'
ReactGA.initialize('G-LNCY42ZM08')
ReactGA.set({ checkProtocolTask: null})
ReactGA.set({ checkStorageTask: null})
ReactGA.set({ historyImportTask: null})

ReactGA.send('pageview')

export {}