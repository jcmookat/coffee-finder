import styles from './card.module.css'
import cls from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

function Card({ name, imgUrl, href }) {
	return (
		<Link href={href}>
			<a className={styles.cardLink}>
				<div className={cls('glass', styles.container)}>
					<div className={styles.cardHeaderWrapper}>
						<h2 className={styles.cardHeader}>{name}</h2>
					</div>
					<div className={styles.cardImageWrapper}>
						<div className={styles.cardImageDimensionWrapper}>
							<Image
								src={imgUrl}
								alt={name}
								className={styles.cardImage}
								layout='fill'
							/>
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}
export default Card
