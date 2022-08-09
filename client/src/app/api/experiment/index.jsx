import api from 'app/api';

const getExperiments = async (userId) => {
    const experiments = await api(userId).get('/experiments');

    return experiments;
};

const getExperiment = async (userId, experimentId) => {
    const experiment = await api(userId).get(`/experiments/${experimentId}`);

    return experiment;
};

const deleteExperiment = async (userId, experimentId) => {
    const confirm = await api(userId).delete(`/experiments/${experimentId}`);

    return confirm;
};

export { getExperiments, getExperiment, deleteExperiment };
