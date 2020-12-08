[@bodiless/components](../README.md) › [Globals](../globals.md) › [NormalHref](normalhref.md)

# Interface: NormalHref

## Hierarchy

* **NormalHref**

## Implemented by

* [DefaultNormalHref](../classes/defaultnormalhref.md)

## Index

### Properties

* [isChildPageOf](normalhref.md#ischildpageof)
* [isExternal](normalhref.md#isexternal)
* [isRelative](normalhref.md#isrelative)
* [isSamePage](normalhref.md#issamepage)
* [parentPage](normalhref.md#parentpage)
* [pathname](normalhref.md#pathname)
* [toString](normalhref.md#tostring)

## Properties

###  isChildPageOf

• **isChildPageOf**: *function*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:35](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L35)*

Determines whether one internal href is a child of another.

**`param`** The href to compare.

#### Type declaration:

▸ (`that`: [NormalHref](normalhref.md)): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [NormalHref](normalhref.md) |

___

###  isExternal

• **isExternal**: *boolean*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:21](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L21)*

Whether this relative is "external" (ie has an explicit hostname).
Note that any href with an explicit hostname is considered external,
even if the hostname matches the current host.

___

###  isRelative

• **isRelative**: *boolean*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:15](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L15)*

Whether this href is relative to the current page.

___

###  isSamePage

• **isSamePage**: *function*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L30)*

Determines whethertwo internal hrefs refer to the same page.

**`param`** The href to compare.

#### Type declaration:

▸ (`that`: [NormalHref](normalhref.md) | string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`that` | [NormalHref](normalhref.md) &#124; string |

___

###  parentPage

• **parentPage**: *[NormalHref](normalhref.md) | undefined*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L25)*

The parent of this href, or undefined for the root page.

___

###  pathname

• **pathname**: *string*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:11](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L11)*

The pathname of this href, suitable for comparison with other normal hrefs

___

###  toString

• **toString**: *function*

*Defined in [packages/bodiless-components/src/Link/NormalHref.ts:7](https://github.com/johnsonandjohnson/Bodiless-JS/blob/f7c8004/packages/bodiless-components/src/Link/NormalHref.ts#L7)*

A string representation of the href, suitable for supplying as a prop to an <a> tag.

#### Type declaration:

▸ (): *string*
