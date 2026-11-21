import { t } from '../translate/i18n'
import React from 'react'
import Aviso from '../components/Aviso'

const NaoEncontrada = () => <Aviso titulo="404" texto={t('ui.nao_encontrada')}/>

export default NaoEncontrada
