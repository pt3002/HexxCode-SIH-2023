import { getRevHTML } from "./draft";

const shortestEdit = (original, target) => {
  const [n, m] = [original.length, target.length];
  const max = n + m;
  const trace = [[0]];
  let originalIdx, targetIdx;

  for (let edits = 0; edits <= max; edits++) {
    const v = [];
    const prev = trace[trace.length - 1];

    for (let deletes = 0; deletes <= edits; deletes++) {
      if (
        deletes === 0 ||
        (deletes !== edits && prev[deletes - 1] < prev[deletes])
      ) {
        originalIdx = prev[deletes];
      } else {
        originalIdx = prev[deletes - 1] + 1;
      }

      targetIdx = originalIdx - (2 * deletes - edits);

      while (
        originalIdx < n &&
        targetIdx < m &&
        original[originalIdx] === target[targetIdx]
      ) {
        originalIdx++;
        targetIdx++;
      }

      v.push(originalIdx);

      if (originalIdx >= n && targetIdx >= m) {
        return trace;
      }
    }
    trace.push(v);
  }
};

const backTrack = (original, target) => {
  const result = [];
  const trace = shortestEdit(original, target);
  let [originalIdx, targetIdx] = [original.length, target.length];

  for (let edits = trace.length - 1; edits >= 0; edits--) {
    const row = trace[edits];
    const deletes = (originalIdx - targetIdx + edits) / 2;
    let prevDeletes;
    if (
      deletes === 0 ||
      (deletes !== edits && row[deletes - 1] < row[deletes])
    ) {
      prevDeletes = deletes;
    } else {
      prevDeletes = deletes - 1;
    }
    const prevOriginalIdx = row[prevDeletes];
    const prevTargetIdx = prevOriginalIdx - (2 * prevDeletes - edits + 1);

    while (originalIdx > prevOriginalIdx && targetIdx > prevTargetIdx) {
      result.push([originalIdx - 1, targetIdx - 1, originalIdx, targetIdx]);
      originalIdx--;
      targetIdx--;
    }
    if (edits > 0) {
      result.push([prevOriginalIdx, prevTargetIdx, originalIdx, targetIdx]);
    }
    [originalIdx, targetIdx] = [prevOriginalIdx, prevTargetIdx];
  }

  return result;
};

const diffRevisions = (original, target) => {
  if (original && target) {
    const result = [];

    for (const [
      prevOriginalIdx,
      prevTargetIdx,
      originalIdx,
      targetIdx,
    ] of backTrack(original, target)) {
      if (originalIdx === prevOriginalIdx) {
        result.push({
          type: "insert",
          data: target[prevTargetIdx],
          origIdx: originalIdx - 1,
          targetIdx: prevTargetIdx + 1,
        });
      } else if (targetIdx === prevTargetIdx) {
        result.push({
          type: "delete",
          data: original[prevOriginalIdx],
          origIdx: prevOriginalIdx + 1,
          targetIdx: targetIdx - 1,
        });
      } else {
        result.push({
          type: "none",
          data: original[prevOriginalIdx],
          origIdx: prevOriginalIdx + 1,
          targetIdx: prevTargetIdx + 1,
        });
      }
    }

    result.reverse();
    return result;
  }
};

const diffSaves = (original, target) => {
  const changedRevs = [];
  const rev = {};
  if (original && target && original.body && target.body) {
    rev.change = "edited";
    rev.diffInfo = diffRevisions(getRevHTML(original), getRevHTML(target));
    if (rev.diffInfo.some((edit) => edit.type !== "none")) {
      changedRevs.push(rev);
    }
    console.log(changedRevs);
    return changedRevs;
  }
};

export default diffSaves;
