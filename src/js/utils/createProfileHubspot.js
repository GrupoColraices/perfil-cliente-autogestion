export const createProfileHubspot = (profile, idDealHubspot) => {
    const authenticatedUserStr = localStorage.getItem('authenticatedUser');
    const authenticatedUser = authenticatedUserStr && JSON.parse(authenticatedUserStr);
    const id_user = authenticatedUser ? authenticatedUser.id : null;

    const viability = profile?.profile?.filter((item) => (!item.viability && item.title !== 'Ley de vivienda') ||
                         (item.title === 'Actividad económica' && item.message !== null));

    const allViable = viability?.every((item) => item.viability === true || item.viability === 'No Aplica');
    
    const congratMessage = '¡Felicitaciones! El esfuerzo por cuidar tu salud financiera ha valido la pena y ahora tienes un cupo de crédito sin ningún tipo de restricción.';

    const messages = allViable
        ? congratMessage
        : viability
            ?.filter(item => item.message !== null)
            ?.map(item => item.message)
            ?.join(' ') || '';
  
    return {
      created_at:profile.created_at?.split('T')[0],
      id_profile: profile.id,
      bank_name: profile?.Bank?.bank_name,
      maximun_quota: profile?.credit?.maximunQuota,
      maximun_quota_fee: profile?.credit?.maximunQuotaFee,
      message: messages,
      id_deal_hubspot: idDealHubspot,
      client_id: profile?.client_id,
      id_user,
    };
};