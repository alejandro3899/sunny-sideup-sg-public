import {
  slateToHtml as slateToHtmlSerializer,
  payloadSlateToDomConfig,
} from "slate-serializers";

const slateToHtml = (
  slateData?: {
    [k: string]: unknown;
  }[],
  payloadConfig?: boolean
) => ({
  __html: slateData
    ? slateToHtmlSerializer(
        slateData,
        payloadConfig ? payloadSlateToDomConfig : undefined
      )
    : "",
});

export default slateToHtml;
