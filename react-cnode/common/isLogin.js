import { getData } from '../database'

export default function () {
	if(getData('user') && getData('user').accesstoken) {
		return true
	}

	return false
}