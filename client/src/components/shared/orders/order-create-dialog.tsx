import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {Customer} from "@/lib/types/customers";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useState, useMemo} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {formatCurrency} from "@/hooks/use-currency";
import {Card} from "@/components/ui/card";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface ClothesVariant {
    id: number;
    size: string;
    stock: number;
}

interface AvailableProduct {
    id: number;
    label: string;
    description: string;
    category: string;
    price: string;
    discount: number;
    stock: number | null;
    active: number;
    clothesVariants?: ClothesVariant[];
}

interface OrderProduct {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    variantId?: number;
    variantSize?: string;
    maxStock: number;
}

interface OrderCreateDialogProps {
    trigger: React.ReactNode;
    customers: Customer[];
    products: AvailableProduct[];
}

export default function OrderCreateDialog(props: OrderCreateDialogProps) {
    const {trigger, customers, products} = props;
    return (
        <Modal
            className="w-[70vw] sm:w-[70vw] sm:max-w-[70vw]"
            title="Criar Novo Pedido"
            trigger={trigger}
            dialogContent={<DialogContent customers={customers} products={products}/>}
        />
    );
}

interface DialogContentProps {
    customers: Customer[];
    products: AvailableProduct[];
}

const DialogContent = ({customers, products}: DialogContentProps) => {
    const router = useRouter();
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [selectedVariantId, setSelectedVariantId] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const selectedCustomer = useMemo(() => {
        return customers.find(customer => String(customer.id) === selectedCustomerId);
    }, [selectedCustomerId, customers]);

    const addresses = useMemo(() => {
        return selectedCustomer?.addresses || [];
    }, [selectedCustomer]);

    const selectedProduct = useMemo(() => {
        return products.find(product => String(product.id) === selectedProductId);
    }, [selectedProductId, products]);

    const selectedVariant = useMemo(() => {
        if (!selectedProduct?.clothesVariants) return null;
        return selectedProduct.clothesVariants.find(v => String(v.id) === selectedVariantId);
    }, [selectedProduct, selectedVariantId]);

    const maxStock = useMemo(() => {
        if (!selectedProduct) return 0;

        let totalStock: number;
        if (selectedProduct.clothesVariants && selectedProduct.clothesVariants.length > 0) {
            totalStock = selectedVariant?.stock || 0;
        } else {
            totalStock = selectedProduct.stock || 0;
        }

        const quantityInCart = orderProducts.reduce((sum, item) => {
            if (item.productId === selectedProduct.id) {
                if (selectedProduct.clothesVariants && selectedProduct.clothesVariants.length > 0) {
                    if (item.variantId === (selectedVariantId ? parseInt(selectedVariantId) : undefined)) {
                        return sum + item.quantity;
                    }
                } else {
                    return sum + item.quantity;
                }
            }
            return sum;
        }, 0);

        return totalStock - quantityInCart;
    }, [selectedProduct, selectedVariant, selectedVariantId, orderProducts]);

    const isProductWithVariants = useMemo(() => {
        return selectedProduct?.clothesVariants && selectedProduct.clothesVariants.length > 0;
    }, [selectedProduct]);

    const canAddProduct = useMemo(() => {
        if (!selectedProduct || quantity <= 0 || quantity > maxStock) return false;
        return !(isProductWithVariants && !selectedVariantId);
    }, [selectedProduct, quantity, maxStock, isProductWithVariants, selectedVariantId]);

    const orderTotal = useMemo(() => {
        return orderProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [orderProducts]);

    const handleAddProduct = () => {
        if (!canAddProduct || !selectedProduct) return;

        const newProduct: OrderProduct = {
            productId: selectedProduct.id,
            productName: selectedProduct.label,
            price: parseFloat(selectedProduct.price),
            quantity: quantity,
            variantId: selectedVariantId ? parseInt(selectedVariantId) : undefined,
            variantSize: selectedVariant?.size,
            maxStock: maxStock
        };

        setOrderProducts([...orderProducts, newProduct]);

        setSelectedProductId("");
        setSelectedVariantId("");
        setQuantity(1);
    };

    const handleRemoveProduct = (index: number) => {
        setOrderProducts(orderProducts.filter((_, i) => i !== index));
    };

    const handleCreateOrder = async () => {
        if (!selectedCustomerId || !selectedAddressId || orderProducts.length === 0) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        setIsCreating(true);

        try {
            const productsPayload = orderProducts.map(product => ({
                product_id: product.productId,
                clothes_variant_id: product.variantId ?? null,
                quantity: product.quantity
            }));

            const payload = {
                customer_id: parseInt(selectedCustomerId),
                address_id: parseInt(selectedAddressId),
                products: productsPayload
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Erro ao criar pedido");
                return;
            }

            toast.success("Pedido criado com sucesso!");

            setSelectedCustomerId("");
            setSelectedAddressId("");
            setSelectedProductId("");
            setSelectedVariantId("");
            setQuantity(1);
            setOrderProducts([]);

            router.refresh();
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("Erro ao conectar com o servidor");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="grid w-full items-center gap-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-2">
                <Label>Cliente</Label>
                <Select
                    name="customer"
                    value={selectedCustomerId}
                    onValueChange={(value) => {
                        setSelectedCustomerId(value);
                        setSelectedAddressId("");
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um cliente"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Cliente</SelectLabel>
                            {customers.map(customer => (
                                <SelectItem value={String(customer.id)} key={customer.id}>
                                    {customer.name} - {customer.email}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Endereço de Entrega</Label>
                <Select
                    name="address"
                    value={selectedAddressId}
                    onValueChange={setSelectedAddressId}
                    disabled={!selectedCustomerId || addresses.length === 0}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={
                            !selectedCustomerId
                                ? "Selecione um cliente primeiro"
                                : addresses.length === 0
                                    ? "Cliente sem endereços cadastrados"
                                    : "Selecione um endereço"
                        }/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Endereço de Entrega</SelectLabel>
                            {addresses.map(address => (
                                <SelectItem value={String(address.id)} key={address.id}>
                                    {address.street}, {address.number}
                                    {address.complement && ` - ${address.complement}`}
                                    {" - "}{address.neighborhood}
                                    {" - CEP: "}{address.postal_code}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold text-lg">Adicionar Produtos</h3>

                <div className="space-y-2">
                    <Label>Produto</Label>
                    <Select
                        value={selectedProductId}
                        onValueChange={(value) => {
                            setSelectedProductId(value);
                            setSelectedVariantId("");
                            setQuantity(1);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um produto"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Produtos Disponíveis</SelectLabel>
                                {products.map(product => {
                                    const hasStock = product.clothesVariants
                                        ? product.clothesVariants.some(v => v.stock > 0)
                                        : (product.stock ?? 0) > 0;

                                    return (
                                        <SelectItem
                                            value={String(product.id)}
                                            key={product.id}
                                            disabled={!hasStock}
                                        >
                                            {product.label} - {formatCurrency(parseFloat(product.price))}
                                            {!hasStock && " (Sem estoque)"}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {isProductWithVariants && (
                    <div className="space-y-2">
                        <Label>Tamanho</Label>
                        <Select
                            value={selectedVariantId}
                            onValueChange={(value) => {
                                setSelectedVariantId(value);
                                setQuantity(1);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um tamanho"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tamanhos Disponíveis</SelectLabel>
                                    {selectedProduct?.clothesVariants?.map(variant => {
                                        const quantityInCart = orderProducts.reduce((sum, item) => {
                                            if (item.productId === selectedProduct.id && item.variantId === variant.id) {
                                                return sum + item.quantity;
                                            }
                                            return sum;
                                        }, 0);
                                        const availableStock = variant.stock - quantityInCart;

                                        return (
                                            <SelectItem
                                                value={String(variant.id)}
                                                key={variant.id}
                                                disabled={availableStock === 0}
                                            >
                                                {variant.size} - Estoque: {availableStock}
                                                {availableStock === 0 && " (Esgotado)"}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedProduct && (!isProductWithVariants || selectedVariantId) && (
                    <div className="space-y-2">
                        <Label>
                            Quantidade
                            {maxStock > 0 ? (
                                <span className="text-muted-foreground text-xs ml-1">
                                    (Disponível: {maxStock})
                                </span>
                            ) : (
                                <span className="text-destructive text-xs ml-1">
                                    (Esgotado no carrinho)
                                </span>
                            )}
                        </Label>
                        <Input
                            type="number"
                            min="1"
                            max={maxStock}
                            value={quantity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                setQuantity(Math.min(Math.max(1, val), maxStock));
                            }}
                            className="w-full"
                            disabled={maxStock === 0}
                        />
                    </div>
                )}

                <Button
                    onClick={handleAddProduct}
                    disabled={!canAddProduct || maxStock === 0}
                    variant="outline"
                    className="w-full"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    {maxStock === 0 && selectedProduct && (!isProductWithVariants || selectedVariantId)
                        ? "Estoque Esgotado (já no carrinho)"
                        : "Adicionar Produto"}
                </Button>
            </div>

            {orderProducts.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                    <h3 className="font-semibold text-lg">Produtos do Pedido</h3>
                    <div className="space-y-2">
                        {orderProducts.map((product, index) => (
                            <Card key={index} className="p-3">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1">
                                        <div className="font-medium">{product.productName}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {product.variantSize && (
                                                <Badge variant="secondary" className="mr-2">
                                                    {product.variantSize}
                                                </Badge>
                                            )}
                                            Quantidade: {product.quantity} × {formatCurrency(product.price)}
                                        </div>
                                        <div className="text-sm font-semibold mt-1">
                                            Subtotal: {formatCurrency(product.price * product.quantity)}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveProduct(index)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Card className="p-4 bg-muted/50">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total do Pedido:</span>
                            <span className="text-2xl font-bold text-primary">
                                {formatCurrency(orderTotal)}
                            </span>
                        </div>
                    </Card>
                </div>
            )}

            <div className="flex gap-2 justify-end pt-4 border-t my-4 mr-2">
                <Button
                    onClick={handleCreateOrder}
                    disabled={!selectedCustomerId || !selectedAddressId || orderProducts.length === 0 || isCreating}
                    className="w-full sm:w-auto"
                >
                    {isCreating ? (
                        <>
                            <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Criando...
                        </>
                    ) : (
                        "Criar Pedido"
                    )}
                </Button>
            </div>
        </div>
    );
};
