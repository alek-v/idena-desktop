import {useEffect, useState} from 'react'
import {fetchIdentity} from '../api'

export const IdentityStatus = {
  Undefined: 'Undefined',
  Invite: 'Invite',
  Newbie: 'Newbie',
  Candidate: 'Candidate',
  Verified: 'Verified',
  Suspend: 'Suspend',
  Zombie: 'Zombie',
  Killed: 'Killed',
}

const mapToFriendlyStatus = status => {
  switch (status) {
    case IdentityStatus.Undefined:
      return 'Not validated'
    default:
      return status
  }
}

const initialIdentity = {
  address: '',
  nickname: '',
  stake: '',
  invites: 0,
  age: 0,
  state: '',
  pubkey: '',
  requiredFlips: 0,
  madeFlips: 0,
  totalQualifiedFlips: 0,
  totalShortFlipPoints: 0,
  flips: null,
  online: false,
}

function useIdentity(address) {
  const [identity, setIdentity] = useState(initialIdentity)

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      // eslint-disable-next-line no-shadow
      const identity = await fetchIdentity(address)
      if (!ignore) {
        const {state: status} = identity
        setIdentity({
          ...identity,
          friendlyStatus: mapToFriendlyStatus(status),
          validated: status === IdentityStatus.Verified,
        })
      }
    }

    if (address) {
      fetchData()
    }

    return () => {
      ignore = true
    }
  }, [address])

  return identity
}

export default useIdentity
