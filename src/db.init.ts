import * as nano from 'nano';
import { DB_CONFIG } from './db.config';
import * as incidentViews from './metadata/view_incident_id.json';
import * as usersData from './metadata/users.json';
import * as incidentData from './metadata/incidents.json';

export async function initCoughDatabase() {
  const nanoCon = nano(DB_CONFIG);
  await createDB('user', nanoCon);
  const isRunningBefore = await createDB('incident', nanoCon);
  if (!isRunningBefore) {
    await createIndexForIncident(nanoCon);
    await initIncidentData(nanoCon);
    await initUserData(nanoCon);
  }
}

async function createDB(dbname: string, nanoCon: any) {
  try {
    await nanoCon.db.create(dbname);
    return false;
  } catch (e) {
    // if db is existed, ignore this
    console.log(e);
    return true;
  }
}

async function createIndexForIncident(nanoCon: any) {
  const db = nanoCon.db.use('incident');
  await db.insert(incidentViews);
}

async function initUserData(nanoCon) {
  // check if data existed, don't need to rerun data
  console.log('start initUserData');
  const db = nanoCon.db.use('user');
  await db.bulk({
    docs: usersData,
  });
}

async function initIncidentData(nanoCon) {
  // check if data existed, don't need to rerun data
  console.log('start initIncidentData');
  const db = nanoCon.db.use('incident');
  await db.bulk({
    docs: incidentData,
  });
}
