//Example and layout action creator, please git rm this file when you create your first action file

const INCREMENT = "INCREMENT";

function increment(num = 1) {
    return async function(dispatch) {
        dispatch({ type: INCREMENT, payload: num });
    }
}

export default increment;