import { useContext, useState, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProjectorContext from 'app/contexts/projector';
import projectorFormReducer from 'app/components/modules/forms/reducer';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Widget from 'app/components/elements/widget';
import SimpleSelect from 'app/components/elements/selects/simple';
import Slider from 'app/components/elements/slider';
import LoadingButton from 'app/components/elements/buttons/loading';
import { postCluster, getPendingClustersCount } from 'app/api/cluster';
import sleep from 'app/utils/chronos';
import humps from 'humps';
import {
    initialFormState,
    algorithmOptions,
    metricOptions,
    AGAffinintyOptions,
    SCAffinintyOptions,
    linkageOptions,
    clusterMethodOptions,
    initParamsOptions,
} from './init';

const ClusterForm = () => {
    const [session] = useSession();
    const router = useRouter();

    const { setOpenMessageBox } = useContext(ProjectorContext);
    const { setErrorMessage } = useContext(ProjectorContext);

    const { setTriggerFetchClusters } = useContext(ProjectorContext);

    const fetchPendingFrequency = 5000;
    const [pendingCount, setPendingCount] = useState(0);
    const [fetchingPendingCount, setFetchingPendingCount] = useState(false);

    const [submitLoading, setSubmitLoading] = useState(false);

    const userId = session.user.email;
    const experimentId = router.query.id;

    const [formState, dispatch] = useReducer(
        projectorFormReducer,
        initialFormState,
    );

    const handleCommonParams = (event) => {
        dispatch({
            type: 'COMMON',
            field: event.target.name,
            value: event.target.value,
        });
    };

    const handleAlgorithmParams = (event) => {
        let value;

        switch (event.target.type) {
            case 'number':
                value = Number(event.target.value);
                break;

            default:
                value = String(event.target.value);
        }

        dispatch({
            type: 'ALGORITHM',
            algorithm: formState.algorithm,
            field: event.target.name,
            value,
        });
    };

    const fetchPendingCount = () => {
        setFetchingPendingCount(true);

        getPendingClustersCount(userId, experimentId)
            .then((response) => {
                const { count } = response.data;

                if (count <= pendingCount) {
                    setTriggerFetchClusters(true);
                }

                setPendingCount(count);

                if (response.data.count > 0) {
                    sleep(fetchPendingFrequency).then(fetchPendingCount);
                } else {
                    setFetchingPendingCount(false);
                }
            })
            .catch((error) => {
                setFetchingPendingCount(false);
                setOpenMessageBox(true);
                setErrorMessage(error.response.data.message);
            });
    };

    const handleSubmit = async () => {
        if (!submitLoading) {
            setSubmitLoading(true);

            const { algorithm } = formState;
            const hasParams = !!formState[algorithm];
            const params = hasParams ? formState[algorithm] : {};

            postCluster(
                userId,
                experimentId,
                humps.decamelize(algorithm, { separator: '_' }),
                humps.decamelizeKeys(params, { separator: '_' }),
            )
                .then(() => {
                    setSubmitLoading(false);
                    setPendingCount(pendingCount + 1);

                    if (!fetchingPendingCount) {
                        sleep(fetchPendingFrequency).then(fetchPendingCount);
                    }
                })
                .catch((error) => {
                    setSubmitLoading(false);
                    setOpenMessageBox(true);
                    setErrorMessage(error.response.data.message);
                });
        }
    };

    useEffect(
        fetchPendingCount,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <Widget
            title="Cluster"
            icon={
                <>
                    <Tooltip title="Pending clusters" arrow>
                        <Badge badgeContent={pendingCount} color="secondary">
                            <ScheduleIcon
                                color={
                                    pendingCount === 0 ? 'disabled' : 'primary'
                                }
                            />
                        </Badge>
                    </Tooltip>
                </>
            }
        >
            <form>
                <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel id="algorithm">Algorithm</InputLabel>
                    <SimpleSelect
                        name="algorithm"
                        options={algorithmOptions}
                        value={formState.algorithm}
                        setValue={handleCommonParams}
                    />
                </FormControl>

                {/* DBSCAN */}
                {formState.algorithm === 'dbscan' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">EPS</Typography>
                            <Slider
                                name="eps"
                                value={formState.dbscan.eps}
                                step={0.01}
                                min={0.01}
                                max={10000}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Min. Samples
                            </Typography>
                            <Slider
                                name="minSamples"
                                value={formState.dbscan.minSamples}
                                step={1}
                                min={1}
                                max={300}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="metric">Metric</InputLabel>
                            <SimpleSelect
                                name="metric"
                                options={metricOptions}
                                value={formState.dbscan.metric}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                {/* KMeans */}
                {formState.algorithm === 'kmeans' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Number of clusters
                            </Typography>
                            <Slider
                                name="nClusters"
                                value={formState.kmeans.nClusters}
                                step={1}
                                min={2}
                                max={100}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                {/* Agglomerative Clustering */}
                {formState.algorithm === 'agglomerativeClustering' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Distance Threshold
                            </Typography>
                            <Slider
                                name="distanceThreshold"
                                value={
                                    formState.agglomerativeClustering
                                        .distanceThreshold
                                }
                                step={1}
                                min={1}
                                max={10000}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="affinity">Affinity</InputLabel>
                            <SimpleSelect
                                name="affinity"
                                options={AGAffinintyOptions}
                                value={
                                    formState.agglomerativeClustering.affinity
                                }
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="linkage">Linkage</InputLabel>
                            <SimpleSelect
                                name="linkage"
                                options={linkageOptions}
                                value={
                                    formState.agglomerativeClustering.linkage
                                }
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                {/* Spectral Clustering */}
                {formState.algorithm === 'spectralClustering' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Number of clusters
                            </Typography>
                            <Slider
                                name="nClusters"
                                value={formState.spectralClustering.nClusters}
                                step={1}
                                min={2}
                                max={100}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="affinity">Affinity</InputLabel>
                            <SimpleSelect
                                name="affinity"
                                options={SCAffinintyOptions}
                                value={formState.spectralClustering.affinity}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">Neighbors</Typography>
                            <Slider
                                name="nNeighbors"
                                value={formState.spectralClustering.nNeighbors}
                                step={1}
                                min={1}
                                max={100}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                {/* Optics */}
                {formState.algorithm === 'optics' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Min. Samples
                            </Typography>
                            <Slider
                                name="minSamples"
                                value={formState.optics.minSamples}
                                step={1}
                                min={1}
                                max={300}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="metric">Metric</InputLabel>
                            <SimpleSelect
                                name="metric"
                                options={metricOptions}
                                value={formState.optics.metric}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="clusterMethod">
                                Cluster Method
                            </InputLabel>
                            <SimpleSelect
                                name="clusterMethod"
                                options={clusterMethodOptions}
                                value={formState.optics.clusterMethod}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Min. Cluster Size
                            </Typography>
                            <Slider
                                name="minClusterSize"
                                value={formState.optics.minClusterSize}
                                step={0.01}
                                min={0}
                                max={0.99}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                {/* Gaussian Mixture */}
                {formState.algorithm === 'gaussianMixture' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Number of components
                            </Typography>
                            <Slider
                                name="nComponents"
                                value={formState.gaussianMixture.nComponents}
                                step={1}
                                min={2}
                                max={100}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="initParams">Init Params</InputLabel>
                            <SimpleSelect
                                name="initParams"
                                options={initParamsOptions}
                                value={formState.gaussianMixture.initParams}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                {/* Birch */}
                {formState.algorithm === 'birch' && (
                    <>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">
                                Number of clusters
                            </Typography>
                            <Slider
                                name="nClusters"
                                value={formState.birch.nClusters}
                                step={1}
                                min={0}
                                max={100}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <Typography variant="caption">Threshold</Typography>
                            <Slider
                                name="threshold"
                                value={formState.birch.threshold}
                                step={0.01}
                                min={0}
                                max={1}
                                setValue={handleAlgorithmParams}
                            />
                        </FormControl>
                    </>
                )}

                <LoadingButton
                    text="Compute"
                    type="submit"
                    color="primary"
                    isLoading={submitLoading}
                    onClick={handleSubmit}
                />
            </form>
        </Widget>
    );
};

export default ClusterForm;
