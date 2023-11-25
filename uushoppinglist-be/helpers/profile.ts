import { Request } from 'express';
import axios from 'axios';
import { User } from '../types/user';
import { Profiles } from '../types/enums/profiles';
import List from '../models/list.model';
export async function getUserInfo(req: Request): Promise<User | undefined> {
	const uri = process.env.ISSUER_BASE_URL + '/userinfo';

	return new Promise<User | undefined>((resolve, reject) => {
		if (req.auth) {
			axios
				.get<User>(uri, {
					headers: {
						Authorization: `Bearer ${req.auth.token}`,
					},
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					resolve(undefined);
				});
		} else {
			resolve(undefined);
		}
	});
}

export const isAuthorized = async (
	userID: string | undefined,
	listID: string,
	profiles: Array<Profiles>,
): Promise<boolean> => {
	if (!userID) return false;
	const profile = await getProfile(userID, listID);
	if (profile)
		for (let _profile of profiles) {
			if (_profile === profile) return true;
		}
	return false;
};

const getProfile = async (userID: string, listID: string): Promise<Profiles | undefined> => {
	const list = await List.findById(listID);
	if (list) {
		if (userID === list.ownerID) return Profiles.OWNER;
		if (list.membersIDs.includes(userID)) return Profiles.MEMBER;
	}
	return;
};
