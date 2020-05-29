import { SLICE_ID_INDEX } from '../constants';

function getShortId(id) {
  const shortId = id.slice(SLICE_ID_INDEX);

  return this.$route.params.id === id ? `${shortId} (OP)` : shortId;
}

export default getShortId;
