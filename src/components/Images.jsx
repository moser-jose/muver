import { t } from '../translate/i18n'
import React, { useRef, useState } from 'react';

const src = (item, size) => `https://image.tmdb.org/t/p/${size}${item.file_path}`;

// Galeria com lightbox no <dialog> nativo (Esc fecha, setas navegam)
const Images = ({data}) => {
    const [index, setIndex] = useState(null);
    const dialog = useRef(null);
    const open = (i) => { setIndex(i); dialog.current.showModal(); };
    const step = (d) => setIndex((i) => (i + d + data.length) % data.length);
    return (
        <div className="imagens">
            {
                data.slice(0,8).map((item, i) => (
                    <div key={item.file_path}>
                        <span><img alt="" loading="lazy" src={src(item,'w780')} onClick={() => open(i)}/></span>
                    </div>
                ))
            }
            <dialog
                ref={dialog}
                className="lightbox"
                onClose={() => setIndex(null)}
                onClick={(e) => e.target === dialog.current && dialog.current.close()}
                onKeyDown={(e) => e.key === 'ArrowLeft' ? step(-1) : e.key === 'ArrowRight' && step(1)}>
                {
                    index !== null && <>
                        <button type="button" aria-label={t('ui.anterior')} onClick={() => step(-1)}>‹</button>
                        <img alt="" src={src(data[index],'w1280')}/>
                        <button type="button" aria-label={t('ui.seguinte')} onClick={() => step(1)}>›</button>
                        <button type="button" aria-label={t('ui.fechar')} className="close" onClick={() => dialog.current.close()}>×</button>
                    </>
                }
            </dialog>
        </div>
    )
}

export default Images
