export interface RightAnchorPluginOptions {
  showDepth: number
  ignore?: string[]
  expand?: {
    trigger: 'hover' | 'click'
    clickModeDefaultOpen: boolean
  }
  customClass?: string
}

export interface RightAnchorPageOptions extends Omit<RightAnchorPluginOptions, 'ignore'> {
  isIgnore: boolean
}
